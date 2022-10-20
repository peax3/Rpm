using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Corper.API.Application.Queries;
using Dapper;
using Microsoft.Data.SqlClient;
using Paroo.Entities;
using Paroo.Entities.OrderAggregate;
using Paroo.Models;

namespace Paroo.Queries
{
    public class OrderQueries : IOrderQueries
    {
        private string _connectionString = string.Empty;

        public OrderQueries(string constr)
        {
            _connectionString = !string.IsNullOrWhiteSpace(constr) ? constr : throw new ArgumentNullException(nameof(constr));
     
        }

        public async Task<QueryResult<OrderDTO>> OrdersByUser(int page, int size, int count, string userId, int status)
        {
            if (count == 0) count = await OrdersByUserCount(userId, status);
            var parameters = new { page, size, userId, status };
            IEnumerable<OrderDTO> products;
            try
            {
                using (

                    var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @$"
                        select o.*,
                        CONCAT(ac.FirstName, ' ', ac.LastName, ' ') as actor_username,
                        pd.name as product_name,
                        pd.Media as product_image,
                        sw.name as product_swap_name,
                        sw.Media as product_swap_image,
                        ac.UserId as actor_id,
                        ac.Picture as actor_pic,
                        CONCAT(ta.FirstName, ' ', ta.LastName, ' ') as target_username,
                        ta.UserId as target_id,
                        ta.Picture as target_pic
                        from orders o
                        join profiles ac on ac.UserId = o.UserId
                        join profiles ta on ta.UserId = o.OwnerId
                        join products pd on pd.Id = o.ProductId
                        LEFT JOIN products sw on sw.Id = o.ExchangeProductId
                        where o.UserId = @userId
                        ORDER BY o.Created
                        OFFSET @size * (@page - 1) ROWS
                        FETCH NEXT @size ROWS ONLY
                    ";
                    //where o.UserId = @userId and OrderStatus = @status
                    products = await conn.QueryAsync<OrderDTO>(querySQL, parameters);
                }

                return new QueryResult<OrderDTO>
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

        public async Task<int> OrdersByUserCount(string userId, int status)
        {
            var count = 0;
            var parameters = new { userId, status };
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @"select count(*) from orders where UserId = @userId and OrderStatus = @status";
                    count = await conn.QueryFirstAsync<int>(querySQL, parameters);
                }
            }
            catch (Exception ex)
            {

                throw;
            }

            return count;
        }

        public async Task<QueryResult<OrderDTO>> OrdersForUser(int page, int size, int count, string userId, int status)
        {
            if (count == 0) count = await OrdersForUserCount(userId, status);
            var parameters = new { page, size, userId, status };
            IEnumerable<OrderDTO> products;
            try
            {
                using (

                    var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @$"
                        select o.*,
                        CONCAT(ac.FirstName, ' ', ac.LastName, ' ') as actor_username,
                        pd.name as product_name,
                        pd.Media as product_image,
                        sw.name as product_swap_name,
                        sw.Media as product_swap_image,
                        ac.UserId as actor_id,
                        ac.Picture as actor_pic,
                        CONCAT(ta.FirstName, ' ', ta.LastName, ' ') as target_username,
                        ta.UserId as target_id,
                        ta.Picture as target_pic
                        from orders o
                        join profiles ac on ac.UserId = o.UserId
                        join profiles ta on ta.UserId = o.OwnerId
                        join products pd on pd.Id = o.ProductId
                        LEFT JOIN products sw on sw.Id = o.ExchangeProductId
                        where o.OwnerId = @userId
                        ORDER BY o.Created
                        OFFSET @size * (@page - 1) ROWS
                        FETCH NEXT @size ROWS ONLY
                    ";
                    //where o.OwnerId = @userId and OrderStatus = @status
                    products = await conn.QueryAsync<OrderDTO>(querySQL, parameters);
                }

                return new QueryResult<OrderDTO>
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

        public async Task<int> OrdersForUserCount(string userId, int status)
        {
            var count = 0;
            var parameters = new { userId, status };
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @"select count(*) from orders where OwnerId = @userId and OrderStatus = @status";
                    count = await conn.QueryFirstAsync<int>(querySQL, parameters);
                }
            }
            catch (Exception ex)
            {

                throw;
            }

            return count;
        }
    }
}
