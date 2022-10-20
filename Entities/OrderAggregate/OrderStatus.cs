using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Paroo.Entities.OrderAggregate
{
    public enum OrderStatus
    {
        Pending,
        Accepted,
        Rejected,
        Dispatched,
        Received,
        Completed,
        Returned
    }
}
