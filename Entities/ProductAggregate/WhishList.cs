using System;

namespace Paroo.Entities.ProductAggregate
{
    //i wonder whats the difference between
    //whishlist and productlike. investigate?
    public class WhishList
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Guid UserId { get;set;}
        public Product Product { get; set; }
    }
}
