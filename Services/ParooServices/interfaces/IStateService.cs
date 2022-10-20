using Paroo.Entities.StateAggregate;
using Paroo.Entities.UserAggregate;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Paroo.Services.ParooServices.interfaces
{
    public interface IStateService
    {
        Task<IEnumerable<State>> FetchStates();
    }
}
