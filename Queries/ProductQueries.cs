using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Corper.API.Application.Queries;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Data.Sqlite;
using Paroo.Entities;
using Paroo.Entities.ProductAggregate;
using Paroo.Models;
using Paroo.Models.Neon;

namespace Paroo.Queries
{
    public class ProductQueries : IProductQueries
    {
        private string _connectionString = string.Empty;

        public ProductQueries(string constr)
        {
            _connectionString = !string.IsNullOrWhiteSpace(constr) ? constr : throw new ArgumentNullException(nameof(constr));
     
        }

        public async Task<QueryResult<ProductQuery>> FetchTrending(int pageNumber, int pageSize, string userId)
        {
            var parameters = new { pageNumber, pageSize, userId};
            IEnumerable<ProductQuery> products;
            int totalRows;
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @"
                        SET DATEFIRST 1 -- Define beginning of week as Monday

                        select COUNT(*) from products
                        where Created >= dateadd(day, 1-datepart(dw, getdate()), CONVERT(date,getdate())) 
                        AND Created <  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate()));


                        SELECT p.*, 
                        f.Id AS 'UserLiked',
                        (select p2.Id  from products p2 where p.Id in (select value from STRING_SPLIT(c.products, ',')
                        ) and p2.Id = p.Id) as ""bookmarked""
                        from products p
	                        LEFT JOIN whish_lists f
	                        ON f.ProductId = p.Id
	                        AND f.UserId = @userId
                            LEFT JOIN carts c
                            ON c.UserId = @userId
                        where p.Created >= dateadd(day, 1-datepart(dw, getdate()), CONVERT(date,getdate())) 
                        AND p.Created <  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate()))
                        ORDER BY ViewCount
                        OFFSET @pageSize * (@pageNumber - 1) ROWS
                        FETCH NEXT @pageSize ROWS ONLY

                    ";

                    var data = await conn.QueryMultipleAsync(querySQL, parameters);
                    totalRows = await data.ReadSingleAsync<int>();
                    products = await data.ReadAsync<ProductQuery>();

                }
            }
            catch (Exception ex)
            {

                throw;
            }

            return new QueryResult<ProductQuery>
            {
                Results = products,
                TotalNumberOfItems = totalRows,
                TotalNumberOfPages = (totalRows / pageSize) + ((totalRows % pageSize) == 0 ? 0 : 1),
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }


        public async Task<QueryResult<OrderQuery>> FetchOrderQuery(int pageNumber, int pageSize, int productId)
        {
            var parameters = new { pageNumber, pageSize, productId };
            IEnumerable<OrderQuery> products;
            int totalRows;
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @"
                        select COUNT(*) from orders o where o.ProductId = @productId;

                        select o.Created, o.Id as orderId,
                        p.Price as productPrice, p.Points  as productPoint,
                        CONCAT(pr.FirstName, ' ', pr.LastName, ' ') as userName,
                        p.name as productName
                        from orders o
                        join products p on p.Id = o.ProductId
                        join profiles pr on pr.UserId = o.UserId
                        where o.ProductId = @productId
                        ORDER BY o.Created
                        OFFSET @pageSize * (@pageNumber - 1) ROWS
                        FETCH NEXT @pageSize ROWS ONLY
                    ";

                    var data = await conn.QueryMultipleAsync(querySQL, parameters);
                    totalRows = await data.ReadSingleAsync<int>();
                    products = await data.ReadAsync<OrderQuery>();

                }
            }
            catch (Exception ex)
            {

                throw;
            }

            return new QueryResult<OrderQuery>
            {
                Results = products,
                TotalNumberOfItems = totalRows,
                TotalNumberOfPages = (totalRows / pageSize) + ((totalRows % pageSize) == 0 ? 0 : 1),
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }

        public async Task<ProductQuery> GetProductWithLike(int productId, string userId)
        {
            ProductQuery data;
            var user_id = userId == null ? Guid.Empty.ToString(): userId.ToUpper();
            var parameters = new { productId, user_id };
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @"
                        SELECT DISTINCT
	                        p.*,
	                        f.Id AS 'UserLiked',
                            pr.UserName AS 'username',
                            (select p2.Id  from products p2 where p.Id in (select value from STRING_SPLIT(c.products, ',')
                            ) and p2.Id = p.Id) as ""bookmarked""
                        from 
	                        products p
                        LEFT JOIN whish_lists f
	                        ON f.ProductId = p.Id
                            AND f.UserId = @user_id
                            LEFT JOIN carts c
                            ON c.UserId = @user_id
                            LEFT JOIN ""AspNetUsers"" pr
                            ON pr.Id = p.UserId
                        WHERE p.Id = @productId
                    ";

                    data = await conn.QueryFirstOrDefaultAsync<ProductQuery>(querySQL, parameters);

                }

                return data;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }


        public async Task<IEnumerable<ProductQuery>> FetchCart(string userId)
        {
            IEnumerable<ProductQuery> data;
            var user_id = userId == null ? "" : userId.ToUpper();
            var parameters = new { user_id };
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @"
                        select p.*,
                        f.Id AS 'UserLiked'
                        from products p
                        LEFT JOIN whish_lists f
                        ON f.ProductId = p.Id
                        AND f.UserId = @user_id
                        LEFT JOIN carts c on c.UserId = @user_id
                        where p.Id in (select value from STRING_SPLIT(c.products, ',') where c.UserId = @user_id)
                    ";

                    data = await conn.QueryAsync<ProductQuery>(querySQL, parameters);

                }

                return data;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }


        public async Task<int> GetProductStatusCountByUserId(string userId)
        {
            var count = 0;
            var parameters = new { userId };
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @"select count(*) from products where ProductStatus = 0 and UserId = @userId";
                    count = await conn.QueryFirstAsync<int>(querySQL, parameters);
                }
            }
            catch (Exception ex)
            {

                throw;
            }

            return count;
        }

        public async Task<int> GetProductCountByUserId(string userId)
        {
            var count = 0;
            var parameters = new { userId };
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @"select count(*) from products where UserId = @userId";
                    count = await conn.QueryFirstAsync<int>(querySQL, parameters);
                }
            }
            catch (Exception ex)
            {

                throw;
            }

            return count;
        }


        public async Task<QueryResult<ProductQuery>> FetchProductByUserId(int pageNumber, int pageSize, string userId, int count, string filter)
        {
            var parameters = new { pageNumber, pageSize, userId };
            var sortType = "";
            if (count == 0)
            {
                if(filter == "status")
                {
                    count = await GetProductStatusCountByUserId(userId);
                    sortType = "and ProductStatus = 0";
                }
                else if(filter == "user")
                {
                    count = await GetProductCountByUserId(userId);
                    sortType = "";
                }
            }
            IEnumerable<ProductQuery> products;
            int totalRows;
            try
            {
                using (
                    
                    var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @$"
                        SELECT p.*
                        from products p
                        where p.UserId = @userId {sortType}
                        ORDER BY p.Created
                        OFFSET @pageSize * (@pageNumber - 1) ROWS
                        FETCH NEXT @pageSize ROWS ONLY
                    ";

                    products = await conn.QueryAsync<ProductQuery>(querySQL, parameters);
                }
            }
            catch (Exception ex)
            {

                throw;
            }

            return new QueryResult<ProductQuery>
            {
                Results = products,
                TotalNumberOfItems = count,
                TotalNumberOfPages = (count / pageSize) + ((count % pageSize) == 0 ? 0 : 1),
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }

        public async Task<QueryResult<ProductQuery>> FetchFavoiriteProducts(int pageNumber, int pageSize, string userId, int count)
        {
            var parameters = new { pageNumber, pageSize, userId };
            if (count == 0)
            {
                count = await GetTotalWhishLists(userId);
            }
            IEnumerable<ProductQuery> products;
            try
            {
                using (

                    var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @$"
                        SELECT p.*
                        from products p
                        where p.Id in (select whish_lists.ProductId from whish_lists where whish_lists.UserId = @userId)
                        ORDER BY p.Id
                        OFFSET @pageSize * (@pageNumber - 1) ROWS
                        FETCH NEXT @pageSize ROWS ONLY
                    ";

                    products = await conn.QueryAsync<ProductQuery>(querySQL, parameters);
                }
            }
            catch (Exception ex)
            {

                throw;
            }

            return new QueryResult<ProductQuery>
            {
                Results = products,
                TotalNumberOfItems = count,
                TotalNumberOfPages = (count / pageSize) + ((count % pageSize) == 0 ? 0 : 1),
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }


        public async Task<int> GetTotalWhishLists(string userId)
        {
            var count = 0;
            var parameters = new { userId };
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @"select count(*) from whish_lists where UserId = @userId";
                    count = await conn.QueryFirstAsync<int>(querySQL, parameters);
                }
            }
            catch (Exception ex)
            {

                throw;
            }

            return count;
        }

        public async Task<QueryResult<ProductQuery>> SearchProducts(int count, int size, int page, string query)
        {
            if (count == 0) count = await SearchProductCount(query);
            var parameters = new { page, size, query };
            IEnumerable<ProductQuery> products;
            try
            {
                using (

                    var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @$"
                        select p.*
                        from products p
                        where name like '%@query%'
                        OFFSET @pageSize * (@page - 1) ROWS
                        FETCH NEXT @size ROWS ONLY
                    ";

                    products = await conn.QueryAsync<ProductQuery>(querySQL, parameters);
                }

                return new QueryResult<ProductQuery>
                {
                    Results = products,
                    TotalNumberOfItems = count,
                    TotalNumberOfPages = (count / size) + ((count % size) == 0 ? 0 : 1),
                    PageNumber = page,
                    PageSize = page
                };
            }
            catch (Exception ex)
            {

                throw;
            }

        }

        public async Task<int> SearchProductCount(string query)
        {
            var count = 0;
            var parameters = new { query };
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @"select count(*) from products where name like '%@query%'";
                    count = await conn.QueryFirstAsync<int>(querySQL, parameters);
                }
            }
            catch (Exception ex)
            {

                throw;
            }

            return count;
        }
        //
        public async Task<QueryResult<Bundle>> FetchBundles(int page, int size, int count, string userId)
        {
            if (count == 0) count = await BundleCount(userId);
            var parameters = new { page, size, userId };
            IEnumerable<Bundle> products;
            try
            {
                using (

                    var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @$"
                        select p.*
                        from bundles p
                        where UserId = @userId
                        ORDER BY p.Id
                        OFFSET @size * (@page - 1) ROWS
                        FETCH NEXT @size ROWS ONLY
                    ";

                    products = await conn.QueryAsync<Bundle>(querySQL, parameters);
                }

                return new QueryResult<Bundle>
                {
                    Results = products,
                    TotalNumberOfItems = count,
                    TotalNumberOfPages = (count / size) + ((count % size) == 0 ? 0 : 1),
                    PageNumber = page,
                    PageSize = page
                };
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public async Task<QueryResult<ProductQuery>> FetchBundleProducts(string userId, int bundleId)
        {
            var parameters = new {userId, bundleId };
            IEnumerable<ProductQuery> products;
            
            try
            {
                using (

                    var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @$"
                        select p.*
                        from products p
                        where UserId = @userId
                        and p.BundleId = @bundleId
                        ORDER BY p.Id
                    ";

                    products = await conn.QueryAsync<ProductQuery>(querySQL, parameters);
                }

                int count = products.Count();

                return new QueryResult<ProductQuery>
                {
                    Results = products,
                    TotalNumberOfItems = count,
                    TotalNumberOfPages = (count / count) + ((count % count) == 0 ? 0 : 1),
                    PageNumber = 1,
                    PageSize = count
                };
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        public async Task<QueryResult<ProductQuery>> UserProducts(int page, int size, int count, string userId)
        {
            if(count == 0) count = await UserProductCount(userId);
            var parameters = new { page, size, userId };
            IEnumerable<ProductQuery> products;
            try
            {
                using (

                    var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @$"
                        select p.*
                        from products p
                        where UserId = @userId
                        ORDER BY p.Id
                        OFFSET @size * (@page - 1) ROWS
                        FETCH NEXT @size ROWS ONLY
                    ";

                    products = await conn.QueryAsync<ProductQuery>(querySQL, parameters);
                }

                return new QueryResult<ProductQuery>
                {
                    Results = products,
                    TotalNumberOfItems = count,
                    TotalNumberOfPages = (count / size) + ((count % size) == 0 ? 0 : 1),
                    PageNumber = page,
                    PageSize = size
                };
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public async Task<int> UserProductCount(string userId)
        {
            var count = 0;
            var parameters = new { userId };
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @"select count(*) from products where UserId = @userId";
                    count = await conn.QueryFirstAsync<int>(querySQL, parameters);
                }
            }
            catch (Exception ex)
            {

                throw;
            }

            return count;
        }


        public async Task<int> BundleCount(string userId)
        {
            var count = 0;
            var parameters = new { userId };
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @"select count(*) from bundles where UserId = @userId";
                    count = await conn.QueryFirstAsync<int>(querySQL, parameters);
                }
            }
            catch (Exception ex)
            {

                throw;
            }

            return count;
        }

        public async Task<QueryResult<ProductQuery>> ProductsToBundle(int page, int size, int count, string userId)
        {
            if (count == 0) count = await ProductsToBundleCount(userId);
            var parameters = new { page, size, userId };
            IEnumerable<ProductQuery> products;
            try
            {
                using (

                    var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @$"
                        select p.*
                        from products p
                        where p.UserId = @userId and p.BundleId IS NULL and p.ProductStatus = 0
                        ORDER BY p.Id
                        OFFSET @size * (@page - 1) ROWS
                        FETCH NEXT @size ROWS ONLY
                    ";

                    products = await conn.QueryAsync<ProductQuery>(querySQL, parameters);
                }

                return new QueryResult<ProductQuery>
                {
                    Results = products,
                    TotalNumberOfItems = count,
                    TotalNumberOfPages = (count / size) + ((count % size) == 0 ? 0 : 1),
                    PageNumber = page,
                    PageSize = size
                };
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        private async Task<int> ProductsToBundleCount(string userId)
        {
            var count = 0;
            var parameters = new { userId };
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @"select count(*) from products where UserId = @userId and BundleId IS NULL and ProductStatus = 0";
                    count = await conn.QueryFirstAsync<int>(querySQL, parameters);
                }
            }
            catch (Exception ex)
            {

                throw;
            }

            return count;
        }


        private async Task<int> ProductCategoryCount(int catId, int max, int min, int stateId)
        {
            var count = 0;
            var parameters = new { catId };
            var builder = new SqlBuilder();
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = builder.AddTemplate(@"select count(*) from products /**where**/");
                    builder.Where("CategoryId = @catId", parameters);
                    if (max > 0)
                    {
                        builder.Where("Price <= @max", new { max });
                    }
                    if (min > 0)
                    {
                        builder.Where("Price >= @min", new { min });
                    }
                    if (stateId > 0)
                    {
                        builder.Where("StateId = @stateId", new { stateId });
                    }
                    count = await conn.QueryFirstAsync<int>(querySQL.RawSql, querySQL.Parameters);
                }
            }
            catch (Exception ex)
            {

                throw;
            }

            return count;
        }

        public async Task<QueryResult<ProductQuery>> FetchProductByCat(int catId, int pageNumber, int pageSize, string userId, int count, int maximum, int minimum, int stateId)
        {
            var parameters = new { pageNumber, pageSize, userId, catId };
            IEnumerable<ProductQuery> products;
            if(count == 0) count = await ProductCategoryCount(catId, maximum, minimum, stateId);
            var builder = new SqlBuilder();
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var selector = builder.AddTemplate(@"
                        SELECT p.*, 
                        f.Id AS 'UserLiked',
                        (select p2.Id  from products p2 where p.Id in (select value from STRING_SPLIT(c.products, ',')
                        ) and p2.Id = p.Id) as ""bookmarked""
                        from products p
	                        LEFT JOIN whish_lists f
	                        ON f.ProductId = p.Id
	                        AND f.UserId = @userId
                            LEFT JOIN carts c
                            ON c.UserId = @userId
                        /**where**/
                        ORDER BY ViewCount
                        OFFSET @pageSize * (@pageNumber - 1) ROWS
                        FETCH NEXT @pageSize ROWS ONLY
                    ", parameters);
                    builder.Where("p.Id In (Select ProductId from product_categories where CategoryId = @catId)");
                    if(maximum > 0)
                    {
                        builder.Where("p.Price <= @maximum", new { maximum});
                    }
                    if (minimum > 0)
                    {
                        builder.Where("p.Price >= @minimum", new { minimum });
                    }
                    if(stateId > 0)
                    {
                        builder.Where("p.StateId = @stateId", new { stateId });
                    }
                    products = await conn.QueryAsync<ProductQuery>(selector.RawSql, selector.Parameters);

                }
            }
            catch (Exception ex)
            {

                throw;
            }

            return new QueryResult<ProductQuery>
            {
                Results = products,
                TotalNumberOfItems = count,
                TotalNumberOfPages = catId, //i dont need this calculation most times, so let me just pass the category Id here
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }
    }
}
