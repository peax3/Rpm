using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Paroo.Entities;
using Paroo.Entities.OrderAggregate;
using Paroo.Exceptions;
using Paroo.Repositories.Interfaces;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Paroo.Repositories
{
    public class OrderRepository:IOrderRepository
    {

        public readonly DataContext _context;
        public OrderRepository(DataContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Order> FetchOrderById(int orderId)
        {
            return await _context.orders.SingleOrDefaultAsync(o => o.Id == orderId);
        }


        

        public async Task<Order> Add(Order order)
        {
            await _context.orders.AddAsync(order);
            await Save();
            return order;
        }

        public async Task<Order> FetchOrderByProductIdAndUserId(int productId, Guid userId)
        {
            return await _context.orders.Where(o => o.ProductId == productId && o.UserId == userId).SingleOrDefaultAsync();
        }

        public async Task<QueryResult<Order>> GetActiveBids(int size, int page, string userId, int total)
        {
            if(total == 0)
            {
                total = _context.orders.Where(o => o.UserId.ToString() == userId && o.Closed == false).Count();
            }
            var orders = await _context.orders.Include(p => p.Product).Where(o=> o.UserId.ToString() == userId && o.Closed == false).Skip(size * (page - 1)).Take(size).ToListAsync();
            return new QueryResult<Order>
            {
                Results = orders,
                TotalNumberOfItems = total,
                TotalNumberOfPages = (total / size) + ((total % size) == 0 ? 0 : 1),
                PageNumber = page,
                PageSize = size
            };
        }

      

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Order order)
        {
            _context.orders.Remove(order);
            await Save();
        }
    }
}
