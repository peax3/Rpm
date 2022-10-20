using Newtonsoft.Json;
using Paroo.Entities.MediaAggregate;
using System;
using System.Collections.Generic;

namespace Paroo.Entities.ProductAggregate
{
    public class Bundle
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
        public int Discount { get; set; }
        public string banner { get;set;}
        public Media Media { get; set; } 
        [JsonIgnore]
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
