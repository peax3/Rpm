using Paroo.Entities;
using Paroo.Entities.CategoryAggregate;
using Paroo.Entities.StateAggregate;
using Paroo.Entities.UserAggregate;
using Paroo.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Paroo.Services.ParooServices.interfaces
{
    public interface ISearchService
    {
        Task<QueryResult<ProductQuery>> SearchProducts(int count, int size, int page, string query);
        Task<QueryResult<Profile>> SearchUsers(int count, int size, int page, string query);
        Task<dynamic> Search(int count, int size, int page, string query);
    }
}
