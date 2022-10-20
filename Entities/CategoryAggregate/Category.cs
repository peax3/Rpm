using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Paroo.Entities.ProductAggregate;

namespace Paroo.Entities.CategoryAggregate
{
    public class Category
    {
        public int Id { get; set; }
        public string name { get; set; }
        [ForeignKey("Category")]
        public int? ParentCategory { get;set;}
        [JsonIgnore]
        public int ProductCount { get; set; }
        [JsonIgnore]
        public ICollection<ProductCategory> ProductCategories { get; set; }
    }
}
