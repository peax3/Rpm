using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Paroo.Entities;
using Paroo.Entities.CategoryAggregate;
using Paroo.Entities.OrderAggregate;
using Paroo.Entities.ProductAggregate;
using Paroo.Entities.UserAggregate;
using Paroo.Models;

namespace Paroo.Repositories.Interfaces
{
    public interface IProfileRepository
    {
        Task<Profile> FetchProfile(string userId);
        Task<Profile> UpdateProfile(Profile profile);
        Task<UserLike> GetMarkedUser(string actorId, string targetId);
        Task<UserLike> Add(UserLike data);
        Task Delete(UserLike data);
        public Task Save();
        
    }
}
