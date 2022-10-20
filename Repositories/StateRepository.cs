using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Corper.API.Application.Queries;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Paroo.Entities;
using Paroo.Entities.StateAggregate;
using Paroo.Entities.UserAggregate;
using Paroo.Models;
using Paroo.Repositories.Interfaces;

namespace Paroo.Repositories
{
    public class StateRepository: IStateRepository
    {
        public readonly DataContext _context;
        private readonly ILogger<StateRepository> _logger;
        public StateRepository(DataContext context, ILoggerFactory loggerFactory)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = loggerFactory.CreateLogger<StateRepository>();
        }

        public IEnumerable<State> FetchStates()
        {
            return _context.states.Include(s=>s.Provinces).AsEnumerable();
        }
       
    }
}
