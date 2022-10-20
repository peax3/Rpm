using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Paroo.Entities.StateAggregate
{
    public class State
    {
        public int Id { get; set; }
        public string name { get; set; }
        public bool allowed { get; set; }
        public ICollection<Province> Provinces { get; set; }
    }
}
