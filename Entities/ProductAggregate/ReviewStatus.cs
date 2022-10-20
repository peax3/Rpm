using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Paroo.Entities.ProductAggregate
{
    //at the end of the day
    //a transaction is either successful 
    //or not..so at what impression was this review 
    //made
    public enum ReviewStatus
    {
        Success,
        Failed
    }
}
