using Paroo.Entities;
using Paroo.Entities.CategoryAggregate;
using Paroo.Entities.StateAggregate;
using Paroo.Entities.UserAggregate;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Paroo.Services.ParooServices.interfaces
{
    public interface ICategoryService
    {
        Task<QueryResult<Category>> FetchCategories(int count, int pageSize, int page);
        Task<List<Category>> FetchCategories(int count);
    }
}
