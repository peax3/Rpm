using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Corper.API.Application.Queries;
using Dapper;
using Microsoft.Data.SqlClient;
using Paroo.Entities;
using Paroo.Entities.StateAggregate;
using Paroo.Entities.UserAggregate;
using Paroo.Models;
using Paroo.Models.Neon;

namespace Paroo.Queries
{
    public class StateQueries : IStateQueries
    {
        private string _connectionString = string.Empty;

        public StateQueries(string constr)
        {
            _connectionString = !string.IsNullOrWhiteSpace(constr) ? constr : throw new ArgumentNullException(nameof(constr));
     
        }

        public async Task<List<State>> FetchStates()
        {
            var topicDictionary = new Dictionary<int, State>();
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @"
                    select t.*, s.*, from states t
                    join provinces s on s.StateId in 
                    (select st.StateId from provinces st where st.StateId = t.Id )
                ";

                    var p = await conn.QueryAsync<State, Province, State>(querySQL, (t, s) =>
                    {
                        State stateEntry;

                        if (!topicDictionary.TryGetValue(t.Id, out stateEntry))
                        {
                            stateEntry = t;
                            stateEntry.Provinces = new List<Province>();
                            topicDictionary.Add(stateEntry.Id, stateEntry);
                        }

                        stateEntry.Provinces.Add(s);
                        return stateEntry;
                    });

                    return p.Distinct().ToList();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }
    }
}
