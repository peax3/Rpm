using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Corper.API.Application.Queries;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Paroo.Entities;
using Paroo.Entities.CartAggregate;
using Paroo.Entities.OrderAggregate;
using Paroo.Entities.ProductAggregate;
using Paroo.Exceptions;
using Paroo.Models;
using Paroo.Repositories.Interfaces;

namespace Paroo.Repositories
{
    public class ProductRepository: IProductRepository
    {
        public readonly DataContext _context;
        public ProductRepository(DataContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Product> Add(Product product)
        {
            await _context.products.AddAsync(product);
            await Save();
            return product;
        }

        public void Delete(Product product)
        {
            throw new NotImplementedException();
        }


        public async Task<List<Product>> GetProductsByStatusAsync(Guid userId, ProductStatus status, int pageSize, int page)
        {
            return await _context.products.Where(p => p.UserId == userId && p.ProductStatus == status).Skip(pageSize * (page - 1)).Take(pageSize).ToListAsync();
        }


        public async Task<List<Product>> GetProductsByStatusAndPriceAndPointsAsync(Guid userId, ProductStatus status, int price, int points, int pageSize, int page)
        {
            return await _context.products.Where(
             p => p.UserId == userId && p.ProductStatus == status && p.Price >= price ||
                  p.UserId == userId && p.ProductStatus == status && p.Points >= points
            ).Skip(pageSize * (page - 1)).Take(pageSize).ToListAsync();
        }

        public async Task<Product> FindById(int id)
        {
            return await _context.products.FindAsync(id);
        }


        public async Task AddToCartAsync(int id, Guid userId)
        {
            var cart = await _context.carts.SingleOrDefaultAsync(c=>c.UserId == userId);
            if(cart == null)
            {
                //this is the users first time
                var newCart = new Cart
                {
                    UserId = userId,
                    products = id.ToString()
                };
                _context.carts.Add(newCart);
            }
            else
            {
                var productIds = cart.products.Split(',').ToHashSet();
                if (!productIds.Contains(id.ToString()))
                {
                    //we add to cart
                    productIds.Add(id.ToString());
                }
                else
                {
                    //we remove from cart
                    productIds.Remove(id.ToString());
                }
                cart.products = String.Join(",", productIds);

            }
            await Save();
        }

        public async Task AddToWishList(int id, Guid userId)
        {

            var newWish = new WhishList
            {
                UserId = userId,
                ProductId = id
            };
            _context.whish_lists.Add(newWish);
            await Save();
        }

        #region ProductView
        public async Task<ProductView> GetProductViewByUserIdAndProductId(Guid userId, int productId)
        {
            return await _context.product_views.Where(p=>p.UserId == userId && p.ProductId == productId).SingleOrDefaultAsync();
        }


        public async Task<ProductView> Add(Guid userId, int productId)
        {
            var hasUserAlreadyViewed = await GetProductViewByUserIdAndProductId(userId, productId);
            if(hasUserAlreadyViewed != null)
            {
                hasUserAlreadyViewed.ViewedOn = DateTime.Now;
                await _context.SaveChangesAsync();
                return hasUserAlreadyViewed;
            }
            else
            {
                var product = await FindById(productId);
                if(product == null) throw new ParooNotFoundException("Analytics view not processed"); //just giberrish
                var newView = new ProductView
                {
                    UserId = userId,
                    ViewedOn = DateTime.Now,
                    ProductId = productId,
                    Product = product
                };
                await _context.product_views.AddAsync(newView);
                product.ViewCount+=1;
                await _context.SaveChangesAsync();
                return newView;
            }
        }
        #endregion

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<Order> GetOrder(int productId, string userId)
        {
            return await _context.orders.FirstOrDefaultAsync(p=>p.ProductId == productId && p.UserId == Guid.Parse(userId));
        }

        public async Task<WhishList> GetWhish(string userId, int productId)
        {
            return await _context.whish_lists.FirstOrDefaultAsync(u=> u.UserId == Guid.Parse(userId) && u.ProductId == productId);
        }

        public async Task Delete(WhishList v)
        {
            _context.whish_lists.Remove(v);
            await Save();
        }

        public async Task<Bundle> Add(Bundle bundle)
        {
            await _context.bundles.AddAsync(bundle);
            await _context.SaveChangesAsync();
            return bundle;
        }

        public async Task Delete(int id, bool deleteProducts, string userId)
        {
            var bundle = await _context.bundles.Where(b=>b.Id == id && b.UserId == Guid.Parse(userId)).FirstOrDefaultAsync();
            if(bundle.UserId != Guid.Parse(userId)) throw new ParooAccessForbiddenException("Access denied");
            if(bundle == null) throw new ParooNotFoundException("Bundle not found");
            if (deleteProducts)
            {
                var products = _context.products.Where(p=>p.BundleId == id);
                _context.products.RemoveRange(products);
            }
            _context.bundles.Remove(bundle);
            await _context.SaveChangesAsync();
        }

        public async Task<Product> GetProductByBundle(Guid userId, int productId, int bundleId)
        {
           return await _context.products.SingleOrDefaultAsync(p=>p.UserId == userId && p.Id == productId && p.BundleId == bundleId);
        }

        public async Task<List<Product>> FetchProductsByUserIdAndIds(List<int> uids, string userId)
        {
            return await _context.products.Where(p=>p.UserId == Guid.Parse(userId) && p.ProductStatus == ProductStatus.Open && uids.Contains(p.Id)).ToListAsync();
        }

        public async Task<Bundle> FindBundleById(int id)
        {
            return await _context.bundles.FindAsync(id);
        }
    }
}
