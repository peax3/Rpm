using Paroo.Entities.OrderAggregate;
using System;

namespace Paroo.Models
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string product_name { get; set; }
        public string product_image { get; set; }
        public string product_swap_name { get; set; }
        public string product_swap_image { get; set; }
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
        public bool IsSwap { get; set; }
        public string actor_username { get;set;}
        public Guid actor_id { get; set; }
        public string actor_pic { get; set; }
        public string target_username { get; set; }
        public Guid target_id { get; set; }
        public string target_pic { get; set; }
    }
}
