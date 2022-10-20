using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Paroo.Entities.MediaAggregate;
using Paroo.Entities.OrderAggregate;

namespace Paroo.Entities.ProductAggregate
{
    public class Product
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public TargetAudience TargetAudience { get; set; }
        public ProductCondition ProductCondition { get; set; }
        public string Description { get; set; }
        public string Media { get; set; }
        public string Name { get; set; }
        public  decimal Price { get; set; }
        public  int Points { get; set; }
        public  int StateId { get; set; }
        public int CategoryId { get; set; }
        public int Quantity { get; set; }
        public int OrderCount { get; set; }
        public int ViewCount { get; set; }
        public int ReviewCount { get; set; }
        public bool swappable { get;set;}
        public int? BundleId { get;set;}
        public Bundle Bundle { get; set; }
        public ProductStatus ProductStatus { get; set; }
        [JsonIgnore]
        public ICollection<Media> Medias { get; set; } = new List<Media>();
        [JsonIgnore]
        public ICollection<ProductReview> ProductReviews { get; set; } = new List<ProductReview>();
        [JsonIgnore]
        public ICollection<ProductView> ProductViews { get; set; } = new List<ProductView>();
        [JsonIgnore]
        public ICollection<Order> Orders { get; set; } = new List<Order>();
        [JsonIgnore]
        public ICollection<ProductCategory> ProductCategories { get; set; } = new List<ProductCategory>();
        [JsonIgnore]
        public ICollection<WhishList> WhishLists {get;set; } = new List<WhishList>();
    }
}
