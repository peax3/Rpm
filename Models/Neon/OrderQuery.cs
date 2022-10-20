using System;

namespace Paroo.Models.Neon
{
    public class OrderQuery
    {
        public string productName { get; set; }
        public int productPrice { get; set; }
        public int productPoint { get; set; }
        public string userName { get;set;}
        public int orderId { get;set;}
        public DateTime created { get; set; }
    }
}
