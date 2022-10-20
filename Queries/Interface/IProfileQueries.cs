using System.Collections.Generic;
using System.Threading.Tasks;
using Paroo.Entities;
using Paroo.Entities.UserAggregate;
using Paroo.Models;
using Paroo.Models.Neon;

namespace Corper.API.Application.Queries
{
    public interface IProfileQueries
    {
        Task<QueryResult<ProfileDTO>> GetProfileSummary(int count, int pageNumber, int pageSize);
        Task<int> GetMemberCount();
        Task<ParooStat> GetParooStats(string userId);
        Task<ProfileStat> GetProfileStat(string userId, string viewerId);
        Task<int> GetTotalUserFavourites(string userId);
        Task<QueryResult<Profile>> FetchFavouriteUsers(int pageNumber, int pageSize, string userId, int count);
        Task<int> SearchUsersCount(string query);
        Task<QueryResult<Profile>> SearchUsers(int count, int size, int page, string query);
    }
}
