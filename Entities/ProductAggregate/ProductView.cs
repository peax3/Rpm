using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Paroo.Entities.ProductAggregate
{
    public class ProductView
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Guid UserId { get; set; }
        public DateTime ViewedOn { get; set; }
        public Product Product { get; set; }
    }
}
