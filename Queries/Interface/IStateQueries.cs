using System.Collections.Generic;
using System.Threading.Tasks;
using Paroo.Entities;
using Paroo.Entities.StateAggregate;
using Paroo.Entities.UserAggregate;
using Paroo.Models;
using Paroo.Models.Neon;

namespace Corper.API.Application.Queries
{
    public interface IStateQueries
    {
        Task<List<State>> FetchStates();
    }
}
