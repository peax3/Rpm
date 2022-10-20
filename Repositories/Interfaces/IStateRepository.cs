using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Paroo.Entities;
using Paroo.Entities.ProductAggregate;
using Paroo.Entities.StateAggregate;
using Paroo.Entities.UserAggregate;
using Paroo.Models;

namespace Paroo.Repositories.Interfaces
{
    public interface IStateRepository
    {
        IEnumerable<State> FetchStates();
    }
}
