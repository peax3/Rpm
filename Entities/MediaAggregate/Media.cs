using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Paroo.Entities.ProductAggregate;

namespace Paroo.Entities.MediaAggregate
{
    public class Media
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public string Url { get; set; }
        public MediaType MediaType { get; set; }
        [ForeignKey("Bundle")]
        public int? BundleId { get; set; }
        [JsonIgnore]
        public Product? Product { get; set; }
        [JsonIgnore]
        public Bundle? Bundle { get; set; }
    }
}
