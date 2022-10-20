using Corper.API.Application.Queries;
using Newtonsoft.Json;
using Paroo.Entities;
using Paroo.Entities.CategoryAggregate;
using Paroo.Entities.MediaAggregate;
using Paroo.Entities.OrderAggregate;
using Paroo.Entities.ProductAggregate;
using Paroo.Exceptions;
using Paroo.Helpers;
using Paroo.Models;
using Paroo.Models.Neon;
using Paroo.Repositories.Interfaces;
using Paroo.Services.ParooServices.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Paroo.Services.ParooServices
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IProfileRepository _profileRepository;
        private readonly IOrderRepository _orderRepository;
        private readonly IProductQueries _productQueries;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IOrderQueries _orderQueries;
        public readonly DataContext _context;

        public ProductService(DataContext context,IProductQueries productQueries, IOrderQueries orderQueries, ICategoryRepository categoryRepository, IProfileRepository profileRepository, IProductRepository productRepository, IOrderRepository orderRepository)
        {
            _productRepository = productRepository ?? throw new ArgumentNullException(nameof(productRepository));
            _productQueries = productQueries ?? throw new ArgumentNullException(nameof(productQueries));
            _orderQueries = orderQueries ?? throw new ArgumentNullException(nameof(orderQueries));
            _orderRepository = orderRepository ?? throw new ArgumentNullException(nameof(orderRepository));
            _profileRepository = profileRepository ?? throw new ArgumentNullException(nameof(profileRepository));
            _categoryRepository = categoryRepository ?? throw new ArgumentNullException(nameof(categoryRepository));
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Product> Add(ProductViewModel product)
        {
            var category = await _categoryRepository.FindCategoryById(product.CategoryId);
            if (category == null) throw new ParooNotFoundException("Product category not found");
            var newProduct = Mapper.ProductViewModel_To_Product(product);
            newProduct.CategoryId = category.Id;
            newProduct.ProductStatus = ProductStatus.Open;
            newProduct.ProductCategories.Add(new ProductCategory { ProductId = newProduct.Id, CategoryId = category.Id });
            category.ProductCount += 1;
            if(newProduct.Medias.Count > 0)
            {
                newProduct.Media = JsonConvert.SerializeObject(newProduct.Medias);
            }
            else
            {
                throw new ParooInvalidOperationException("Please upload at least one image or video");
            }
            return await _productRepository.Add(newProduct);
        }

        public async Task AddToCartAsync(int id, Guid userId)
        {
            await _productRepository.AddToCartAsync(id, userId);
        }

        public async Task Bid(int productId, int swapId, Guid userId, ExchangeType exchange, int point)
        {
            var checkOrder = await _orderRepository.FetchOrderByProductIdAndUserId(productId, userId);
            if (checkOrder != null) throw new ParooInvalidOperationException("Order has already been placed");
            var profile = await _profileRepository.FetchProfile(userId.ToString());
            var mainProduct = await _productRepository.FindById(productId);
            if (mainProduct == null) throw new ParooNotFoundException("Product for bid not found");
            mainProduct.ProductStatus = ProductStatus.Committed;
            Product product2Swap = null;

            if(exchange == ExchangeType.Swap)
            {
                product2Swap = await _productRepository.FindById(swapId);
                if (product2Swap == null) throw new ParooNotFoundException("Product for swap not found");
                if (product2Swap.UserId != userId) throw new ParooAccessForbiddenException("You do not have privilegdes for this operation");
                if (product2Swap.ProductStatus != ProductStatus.Open) throw new ParooNotFoundException("Product availability denied");
                product2Swap.ProductStatus = ProductStatus.Committed;
            }
            else if (exchange == ExchangeType.Points)
            {
                if (profile.Points < point) throw new ParooInvalidOperationException("Insufficient points");
            }
            var newOrder = new Order
            {
                Product = mainProduct,
                ProductId = mainProduct.Id,
                UserId = userId,
                OrderStatus = OrderStatus.Pending,
                IsSwap = swapId != 0,
                OwnerId = mainProduct.UserId,
                Created =  DateTime.Now
            };

            if (exchange == ExchangeType.Points)
            {
                newOrder.ExchangePoints = point;
                profile.Points -= point;
            }
            else if (exchange == ExchangeType.Swap)
            {
                newOrder.ExchangeProductId = product2Swap.Id;
                product2Swap.ProductStatus = ProductStatus.Committed;
            }
            mainProduct.OrderCount +=1;
            await _orderRepository.Add(newOrder);
        }

        public async Task<IEnumerable<ProductQuery>> FetchCart(string userId)
        {
            return await _productQueries.FetchCart(userId);
        }

        //Task<QueryResult<ProductQuery>> FetchBundleProducts(int pageNumber, int pageSize, string userId, int bundleId);
        public async Task<QueryResult<ProductQuery>> FetchBundleProducts(string userId, int bundleId)
        {
            return await _productQueries.FetchBundleProducts(userId, bundleId);
        }
        public async Task<QueryResult<ProductQuery>> FetchProducts(int pageNumber, int pageSize, string flag, string userId)
        {
            QueryResult<ProductQuery> res = null;
            if (flag == "trending")
            {
                res = await _productQueries.FetchTrending(pageNumber, pageSize, userId);
            }

            return res;
        }

        public async Task<QueryResult<ProductQuery>> FetchProductByUserId(int pageNumber, int pageSize, string userId, int count, string filter)
        {
            QueryResult<ProductQuery> res = null;
            res = await _productQueries.FetchProductByUserId(pageNumber, pageSize, userId, count, filter);
            return res;
        }

        public async Task<QueryResult<OrderQuery>> FetchOrderQuery(int pageNumber, int pageSize, int productId)
        {
           return await _productQueries.FetchOrderQuery(pageNumber, pageSize, productId);   
        }

        public async Task<Order> GetOrder(int productId, string userId)
        {
            return await _productRepository.GetOrder(productId, userId);
        }

        public async Task<List<Product>> GetProductsByStatusAndPriceAndPointsAsync(Guid userId, ProductStatus status, int price, int points, int pageSize, int page)
        {
            return await _productRepository.GetProductsByStatusAndPriceAndPointsAsync(userId, status, price, points, pageSize, page);
        }

        public async Task<ProductQuery> GetProductWithLike(int productId, string userId)
        {
            return await _productQueries.GetProductWithLike(productId, userId);
        }

        public async Task<List<Category>> FetchCategoriesAsync()
        {
            return await _categoryRepository.FetchCategories();
        }

        public async Task AddToWhish(string userId, int productId)
        {
            var product = await _productRepository.FindById(productId);
            if (product == null) throw new ParooNotFoundException("Product wish list not found");
            var alreadyAdded = await _productRepository.GetWhish(userId, productId);
            if (alreadyAdded != null)
            {
                await _productRepository.Delete(alreadyAdded);
            }
            else
            {
                await _productRepository.AddToWishList(productId, Guid.Parse(userId));
            }
        }

        

        public async Task<QueryResult<ProductQuery>> UserProducts(int pageNumber, int pageSize, int count, string userId)
        {
            return await _productQueries.UserProducts(pageNumber, pageSize, count, userId);
        }

        public async Task<QueryResult<Bundle>> FetchBundles(int pageNumber, int pageSize, int count, string userId)
        {
            return await _productQueries.FetchBundles(pageNumber, pageSize, count, userId);
        }

        public async Task<QueryResult<OrderDTO>> OrdersByUser(int pageNumber, int pageSize, int count, string userId, int status)
        {
            return await _orderQueries.OrdersByUser(pageNumber, pageSize, count,userId, status);
        }

        public async Task<QueryResult<OrderDTO>> OrdersForUser(int pageNumber, int pageSize, int count, string userId, int status)
        {
            return await _orderQueries.OrdersForUser(pageNumber, pageSize, count, userId, status);
        }

        public async Task AcceptOrder(int OrderId, string userId)
        {
            var order = await _orderRepository.FetchOrderById(OrderId);
            if (order == null) throw new ParooNotFoundException("Order does not exist");
            var product = await _productRepository.FindById(order.ProductId);
            if (product == null) throw new ParooNotFoundException("Product does not exist");
            if (product.UserId != Guid.Parse(userId)) throw new ParooAccessForbiddenException("This operation is not allowed");
            order.OrderStatus = OrderStatus.Accepted;
            order.Accepted_on = DateTime.Now;
            await _orderRepository.Save();
        }



        public async Task SetProductDispatched(int OrderId, string userId)
        {
            var order = await _orderRepository.FetchOrderById(OrderId);
            if (order == null) throw new ParooNotFoundException("Order does not exist");
            if (order.UserId != Guid.Parse(userId)) throw new ParooAccessForbiddenException("This operation is not allowed");
            Product product;
            if (order.IsSwap)
            {
                product = await _productRepository.FindById(order.ExchangeProductId);
            }
            else
            {
                product = await _productRepository.FindById(order.ProductId);
            }
            
            if (product == null) throw new ParooNotFoundException("Product does not exist");
            if (product.UserId != Guid.Parse(userId)) throw new ParooAccessForbiddenException("This operation is not allowed");
            order.Dispatched_on = DateTime.Now;
            await _productRepository.Save();
        }

        public async Task RejectOrder(int OrderId, string userId)
        {
            var order = await _orderRepository.FetchOrderById(OrderId);
            if (order == null) throw new ParooNotFoundException("Order does not exist");
            if (order.UserId != Guid.Parse(userId)) throw new ParooAccessForbiddenException("This operation is not allowed");
            var product = await _productRepository.FindById(order.ProductId);
            if (product == null) throw new ParooNotFoundException("Product does not exist");
            if (product.UserId != Guid.Parse(userId)) throw new ParooAccessForbiddenException("This operation is not allowed");
            product.ProductStatus = ProductStatus.Open;
            if (order.IsSwap)
            {
                var swapProduct = await _productRepository.FindById(order.ExchangeProductId);
                swapProduct.ProductStatus = ProductStatus.Open;
            }
            else
            {
                var profile = await _profileRepository.FetchProfile(order.UserId.ToString());
                profile.Points+= order.ExchangePoints;
            }
            await _orderRepository.Delete(order);
        }

        //

        public async Task<BundleDTO> UpdateBundle(BundleDTO bul, string userId)
        {
            var bundle = await _productRepository.FindBundleById(bul.id);
            if(bundle != null && bundle.UserId == Guid.Parse(userId))
            {
                bundle.Updated = DateTime.Now;
                bundle.Title = bul.title;
                bundle.Description = bul.description;

                await _productRepository.Save();
            }
            throw new ParooNotFoundException("Bundle not dount");
        }

        public async Task<BundleDTO> CreateBundle(BundleDTO bul, string userId)
        {
            var newBundle = new Bundle
            {
                Created = DateTime.Now,
                Title = bul.title,
                Description = bul.description,
                Discount = bul.discount,
                UserId = Guid.Parse(userId),
                Media = bul.media
            };
            
            var res = await _productRepository.Add(newBundle);
            if (bul.media != null) res.banner = JsonConvert.SerializeObject(newBundle.Media);
            await _productRepository.Save();
            bul.id = res.Id;
            return bul;
        }

        public async Task RemoveFromBundle(string userId, int productId, int bundleId)
        {
            var product = await _productRepository.GetProductByBundle(Guid.Parse(userId), productId, bundleId);
            if(product == null) throw new ParooNotFoundException("Product does not exist");
            product.Bundle = null;
            product.BundleId = null;
            await _productRepository.Save();
        }

        public async Task<QueryResult<ProductQuery>> ProductsToBundle(int pageNumber, int pageSize, int count, string userId)
        {
            return await _productQueries.ProductsToBundle(pageNumber, pageSize, count, userId);
        }

        public async Task AddToBundle(string products, string userId, int bundleId)
        {
            var bundle = await _productRepository.FindBundleById(bundleId);
            if(bundle != null && bundle.UserId == Guid.Parse(userId))
            {
                var uids = products.Split(',').Select(s => int.Parse(s)).ToList();
                var prods = await _productRepository.FetchProductsByUserIdAndIds(uids, userId);
                foreach (var item in prods)
                {
                    item.BundleId = bundle.Id;
                    item.Bundle = bundle;
                }

                await _productRepository.Save();
            }
            
        }

        public async Task<Media> UpdateBundleBanner(Media media, int bundleId, string userId, string webtRootPath)
        {
            var bundle = await _productRepository.FindBundleById(bundleId);
            Media OldMedia = null;
            if (!String.IsNullOrEmpty(bundle.banner))
            {
                OldMedia = JsonConvert.DeserializeObject<Media>(bundle.banner);
            }
            if(bundle == null || bundle.UserId != Guid.Parse(userId))
            {
                if(media != null)
                {
                    //we clean the media and delete the image
                    _context.medias.Remove(await _context.medias.FindAsync(media.Id));
                    System.IO.File.Delete(System.IO.Path.Combine(webtRootPath, media.Url));
                }

                throw new ParooInvalidOperationException("Error processing your request");
            }
            if (OldMedia != null)
            {
                _context.medias.Remove(await _context.medias.FindAsync(OldMedia.Id));
                await _context.SaveChangesAsync();
                System.IO.File.Delete(System.IO.Path.Combine(webtRootPath, OldMedia.Url));
            }


            media.BundleId = bundle.Id;
            await _context.medias.AddAsync(media);
            await _context.SaveChangesAsync();

            bundle.Media = media;
            bundle.banner = JsonConvert.SerializeObject(media);
            await _context.SaveChangesAsync();
            return media;
            
        }

        public async Task<QueryResult<ProductQuery>> FetchProductByCat(string catName, int pageNumber, int pageSize, string userId, int count, int maximum, int minumum, int stateId)
        {
            var cat = await _categoryRepository.FindCategoryByName(catName);
            if(cat == null) throw new ParooNotFoundException("Category not found");
            return await _productQueries.FetchProductByCat(cat.Id, pageNumber, pageSize, userId, count, maximum, minumum, stateId);
        }

        public async Task<QueryResult<ProductQuery>> FetchProductByCat(int catId, int pageNumber, int pageSize, string userId, int count, int maximum, int minumum, int stateId)
        {
            return await _productQueries.FetchProductByCat(catId, pageNumber, pageSize, userId, count, maximum, minumum, stateId);
        }
    }
}
