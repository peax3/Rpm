using System;

namespace Paroo.Entities.UserAggregate
{
    public class UserLike
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public Guid ProfileId { get; set; }
        public DateTime created { get; set; }
        public Profile Profile { get; set; }
    }
}
