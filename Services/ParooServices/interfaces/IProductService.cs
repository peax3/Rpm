using Paroo.Entities;
using Paroo.Entities.CategoryAggregate;
using Paroo.Entities.MediaAggregate;
using Paroo.Entities.OrderAggregate;
using Paroo.Entities.ProductAggregate;
using Paroo.Entities.UserAggregate;
using Paroo.Models;
using Paroo.Models.Neon;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Paroo.Services.ParooServices.interfaces
{
    public interface IProductService
    {
        Task<ProductQuery> GetProductWithLike(int productId, string userId);
        Task<Order> GetOrder(int productId, string userId);
        Task<Product> Add(ProductViewModel product);
        Task<List<Product>> GetProductsByStatusAndPriceAndPointsAsync(Guid userId, ProductStatus status, int price, int points, int pageSize, int page);
        Task AddToCartAsync(int id, Guid userId);
        Task Bid(int productId, int swapId, Guid userId, ExchangeType exchange, int point);
        Task<IEnumerable<ProductQuery>> FetchCart(string userId);
        Task AcceptOrder(int OrderId,string userId);
        Task RejectOrder(int OrderId, string userId);
        Task<BundleDTO> CreateBundle(BundleDTO bul, string userId);
        Task<BundleDTO> UpdateBundle(BundleDTO bul, string userId);
        Task SetProductDispatched(int OrderId, string userId);
        Task<QueryResult<ProductQuery>> FetchProducts(int pageNumber, int pageSize, string flag, string userId);
        Task<QueryResult<ProductQuery>> FetchProductByCat(string catName, int pageNumber, int pageSize, string userId, int count, int maximum, int minumum, int stateId);
        Task<QueryResult<ProductQuery>> FetchProductByCat(int catId, int pageNumber, int pageSize, string userId, int count, int maximum, int minumum, int stateId);
        Task<QueryResult<ProductQuery>> UserProducts(int pageNumber, int pageSize, int count, string userId);
        Task<List<Category>> FetchCategoriesAsync();
        Task<QueryResult<OrderQuery>> FetchOrderQuery(int pageNumber, int pageSize, int productId);
        Task AddToWhish(string userId, int productId);
        Task<QueryResult<ProductQuery>> FetchProductByUserId(int pageNumber, int pageSize, string userId, int count, string filter);
        Task<QueryResult<OrderDTO>> OrdersByUser(int pageNumber, int pageSize, int count, string userId, int status);
        Task<QueryResult<OrderDTO>> OrdersForUser(int pageNumber, int pageSize, int count, string userId, int status);


        //Bundle
        Task<QueryResult<Bundle>> FetchBundles(int pageNumber, int pageSize, int count, string userId);
        Task<QueryResult<ProductQuery>> FetchBundleProducts(string userId, int bundleId);
        Task RemoveFromBundle(string userId, int productId, int bundleId);
        Task<QueryResult<ProductQuery>> ProductsToBundle(int pageNumber, int pageSize, int count, string userId);
        Task AddToBundle(string products, string userId, int bundleId);
        Task<Media> UpdateBundleBanner(Media media, int bundleId, string userId, string webRootPath);
    }
}
