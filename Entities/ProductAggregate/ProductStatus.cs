using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Paroo.Entities.ProductAggregate
{
    //Open means anybody can bid for it
    //Committed means a user and receiver have agreed
    //Completed means the trade was either accepted or rejected
    public enum ProductStatus
    {
        Open,
        Committed,
        Completed
    }
}
