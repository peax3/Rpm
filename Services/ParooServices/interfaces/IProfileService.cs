using Microsoft.AspNetCore.Identity;
using Paroo.Entities;
using Paroo.Entities.OrderAggregate;
using Paroo.Entities.UserAggregate;
using Paroo.Models;
using Paroo.Models.Neon;
using System.Threading.Tasks;

namespace Paroo.Services.ParooServices.interfaces
{
    public interface IProfileService
    {
        Task<Profile> FetchProfile(string userId);
        Task<Profile> UpdateProfile(Profile profile);
        Task<Profile> UpdateProfile(Profile profile, string part);
        Task<QueryResult<ProfileDTO>> GetMembersSummary(int totalCount, int pageSize, int page);
        Task<QueryResult<Order>> GetActiveBids(int size, int page, string userId, int total);
        Task<ParooStat> GetParooStats(string userId);
        Task<IdentityUser> FetchUserByUserName(string username);
        Task<ProfileStat> GetProfileStat(string userId, string viewer);
        Task MarkFavourite(string actorId, string targetId);
        Task<QueryResult<Profile>> FetchFavouriteUsers(int pageNumber, int pageSize, string userId, int count);
        Task<QueryResult<ProductQuery>> FetchFavoiriteProducts(int pageNumber, int pageSize, string userId, int count);
    }
}
