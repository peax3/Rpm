using Paroo.Entities.ProductAggregate;

namespace Paroo.Entities.CategoryAggregate
{
    public class CategoryPrices
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public decimal Price { get; set; }
        public ProductCondition Condition { get; set; }
        public Category Category { get; set; }
    }
}
