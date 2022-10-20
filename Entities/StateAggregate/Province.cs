using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Paroo.Entities.StateAggregate
{
    public class Province
    {
        public int Id { get; set; }
        public int StateId { get; set; }
        public string name { get; set; }

        public State State { get; set; }
    }
}
