using System.Collections.Generic;

namespace Paroo.Models.Neon
{
    public class UserRoleDTO
    {
        public string uid { get; set; }
        public string name { get; set; }
        public string picture { get; set; }
        public ICollection<string> roles { get; set; } = new List<string>();
    }
}
