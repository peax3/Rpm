using System;

namespace Paroo.Entities.CartAggregate
{
    public class Cart
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public string products { get; set; }
    }
}
