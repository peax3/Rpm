using System;
using System.Threading.Tasks;
using Paroo.Entities;
using Paroo.Entities.OrderAggregate;

namespace Paroo.Repositories.Interfaces
{
    public interface IOrderRepository
    {
        Task<Order> FetchOrderByProductIdAndUserId(int productId, Guid userId);
        Task<QueryResult<Order>> GetActiveBids(int size, int page, string userId, int total);
        Task<Order> Add(Order order);
        Task Delete(Order order);
        Task Save();
        Task<Order> FetchOrderById(int orderId);
    }
}
