using System.Collections.Generic;
using System.Threading.Tasks;
using Paroo.Entities;
using Paroo.Entities.OrderAggregate;
using Paroo.Models;
using Paroo.Models.Neon;

namespace Corper.API.Application.Queries
{
    public interface IOrderQueries
    {
        Task<QueryResult<OrderDTO>> OrdersByUser(int pageNumber, int pageSize, int count, string userId, int status);
        Task<int> OrdersByUserCount(string userId, int status);


        Task<QueryResult<OrderDTO>> OrdersForUser(int pageNumber, int pageSize, int count, string userId, int status);
        Task<int> OrdersForUserCount(string userId, int status);
    }
}
