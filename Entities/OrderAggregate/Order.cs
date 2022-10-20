using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Paroo.Entities.ProductAggregate;

namespace Paroo.Entities.OrderAggregate
{
    public class Order
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int ExchangePoints { get; set; }
        public int ExchangeProductId { get; set; }
        public Guid UserId { get; set; }
        public Guid OwnerId { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public DateTime Created { get; set; }
        public DateTime Accepted_on { get; set; }
        public DateTime Dispatched_on { get; set; }
        public DateTime Received_on { get; set; }
        public Guid Dispatcher_id { get; set; }
        public bool Closed { get; set; }
        public Product Product { get; set; }
        public bool IsSwap { get;set;}
    }
}
