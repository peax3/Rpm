using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Paroo.Entities.ProductAggregate
{
    public class ProductReview
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string Remarks { get; set; }
        public Guid UserId { get; set; }
        public ReviewStatus ReviewStatus { get; set; }
        //useful if we want to compare when 
        //the product was uploaded,
        //when the user placed an order
        //when the oder was finally finalized
        public DateTime Created { get; set; }

        public Product Product { get; set; }
    }
}
