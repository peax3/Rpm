using System;

namespace Paroo.Entities.DispatchAggregate
{
    public class Dispatcher
    {
        public int Id { get; set; }
        public Guid UserId { get;set;}
        public int ProductId { get; set; }
        public DateTime Created { get;set;}
        public Guid AssignedBy { get; set; }
    }
}
