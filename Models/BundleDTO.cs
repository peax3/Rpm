using Paroo.Entities.MediaAggregate;

namespace Paroo.Models
{
    public class BundleDTO
    {
        public string title { get; set; }
        public string description { get; set; }
        public int discount { get; set; }
        public int id { get; set; }
        public Media media { get;set;}
    }
}
