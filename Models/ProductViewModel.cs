using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Paroo.Entities.MediaAggregate;
using Paroo.Entities.ProductAggregate;

namespace Paroo.Models
{
    public class ProductViewModel
    {
        public ProductViewModel()
        {
            Created = DateTime.Now;
        }
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public TargetAudience TargetAudience { get; set; }
        public ProductCondition ProductCondition { get; set; }
        public ExchangeType ExchangeType { get; set; }
        public string Description { get; set; }
        public string Media { get; set; }
        public bool swappable { get; set; }
        public string name { get; set; }
        public  int Price { get; set; }
        public  int StateId { get; set; }
        public  int Points { get; set; }
        public  int CategoryId { get; set; }
        public int Quantity { get; set; }
        public ICollection<Media> medias = new List<Media>();
    }





    public class ProductQuery 
    {
        [JsonProperty("userLiked")]
        public int UserLiked { get; set; }
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("userId")]
        public Guid UserId { get; set; }
        [JsonProperty("created")]
        public DateTime Created { get; set; }
        [JsonProperty("updated")]
        public DateTime Updated { get; set; }
        [JsonProperty("targetAudience")]
        public TargetAudience TargetAudience { get; set; }
        [JsonProperty("productCondition")]
        public ProductCondition ProductCondition { get; set; }
        public ExchangeType ExchangeType { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
        [JsonProperty("media")]
        public string Media { get; set; }
        public bool swappable { get;set;}
        [JsonProperty("viewCount")]
        public int ViewCount { get;set;}
        [JsonProperty("orderCount")]
        public int OrderCount { get; set; }
        public string name { get; set; }
        public string username { get; set; }
        [JsonProperty("price")]
        public  int Price { get; set; }
        [JsonProperty("stateId")]
        public  int StateId { get; set; }
        [JsonProperty("points")]
        public  int Points { get; set; }
        public int bookmarked { get; set; }
        [JsonProperty("categoryId")]
        public  int CategoryId { get; set; }
        [JsonProperty("quantity")]
        public int Quantity { get; set; }
    }
}
