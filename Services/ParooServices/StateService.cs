using Corper.API.Application.Queries;
using Paroo.Entities.StateAggregate;
using Paroo.Repositories.Interfaces;
using Paroo.Services.ParooServices.interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Paroo.Services.ParooServices
{
    public class StateService : IStateService
    {
        private readonly IStateRepository _stateRepository;
        private readonly IStateQueries _stateQueries;

        public StateService(IStateRepository stateRepository, IStateQueries stateQueries)
        {
            _stateRepository = stateRepository ?? throw new ArgumentNullException(nameof(stateRepository));
            _stateQueries = stateQueries ?? throw new ArgumentNullException(nameof(stateQueries));
        }

        public async Task<IEnumerable<State>> FetchStates()
        {
            return _stateRepository.FetchStates();
            //return await _stateQueries.FetchStates();
        }
    }
}
