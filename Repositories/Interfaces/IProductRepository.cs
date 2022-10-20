using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Paroo.Entities;
using Paroo.Entities.CategoryAggregate;
using Paroo.Entities.OrderAggregate;
using Paroo.Entities.ProductAggregate;
using Paroo.Models;

namespace Paroo.Repositories.Interfaces
{
    public interface IProductRepository
    {
        public Task<Product> Add(Product product);
        public void Delete(Product product);
        public Task<Product> FindById(int id);
        public Task<List<Product>> FetchProductsByUserIdAndIds(List<int> uids, string userId);
        public Task<Order> GetOrder(int productId, string userId);
        Task<List<Product>> GetProductsByStatusAsync(Guid userId, ProductStatus status, int pageSize, int page);
        Task<List<Product>> GetProductsByStatusAndPriceAndPointsAsync(Guid userId, ProductStatus status, int price, int points, int pageSize, int page);

        #region Cart
        Task AddToCartAsync(int id, Guid userId);
        #endregion



        #region WishList
        Task AddToWishList(int id, Guid userId);
        Task<WhishList> GetWhish(string userId, int productId);
        Task Delete(WhishList v);
        #endregion



        #region ProductView
        Task<ProductView> GetProductViewByUserIdAndProductId(Guid userId, int productId);
        Task<Product> GetProductByBundle(Guid userId, int productId, int bundleId);
        Task<ProductView> Add(Guid userId, int productId);
        #endregion



        #region Bundle
        Task<Bundle> Add(Bundle bundle);
        Task<Bundle> FindBundleById(int id);
        Task Delete(int id, bool deleteProducts, string userId);
        #endregion



        public Task Save();
        
    }
}
