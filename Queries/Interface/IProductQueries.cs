using System.Collections.Generic;
using System.Threading.Tasks;
using Paroo.Entities;
using Paroo.Entities.ProductAggregate;
using Paroo.Models;
using Paroo.Models.Neon;

namespace Corper.API.Application.Queries
{
    public interface IProductQueries
    {
        Task<ProductQuery> GetProductWithLike(int productId, string userId);
        Task<QueryResult<ProductQuery>> FetchTrending(int pageNumber, int pageSize, string userId);
        Task<IEnumerable<ProductQuery>> FetchCart(string userId);
        Task<int> GetProductStatusCountByUserId(string userId);
        Task<int> GetProductCountByUserId(string userId);
        Task<QueryResult<OrderQuery>> FetchOrderQuery(int pageNumber, int pageSize, int productId);
        Task<QueryResult<ProductQuery>> FetchProductByUserId(int pageNumber, int pageSize, string userId, int count, string filter);
        Task<QueryResult<ProductQuery>> FetchFavoiriteProducts(int pageNumber, int pageSize, string userId, int count);
        Task<int> GetTotalWhishLists(string userId);
        Task<QueryResult<ProductQuery>> SearchProducts(int count, int size, int page, string query);
        Task<int> SearchProductCount(string query);
        Task<QueryResult<ProductQuery>> UserProducts(int pageNumber, int pageSize, int count, string userId);
        Task<QueryResult<Bundle>> FetchBundles(int pageNumber, int pageSize, int count, string userId);
        Task<int> UserProductCount(string userId);
        Task<QueryResult<ProductQuery>> FetchBundleProducts(string userId, int bundleId);
        Task<QueryResult<ProductQuery>> ProductsToBundle(int pageNumber, int pageSize, int count, string userId);
        Task<QueryResult<ProductQuery>> FetchProductByCat(int id, int pageNumber, int pageSize, string userId, int count, int maximum, int minumum, int stateId);
    }
}
