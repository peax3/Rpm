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
    public class ProfileRepository: IProfileRepository
    {
        public readonly DataContext _context;
        public ProfileRepository(DataContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Profile> FetchProfile(string userId)
        {
            return await _context.profiles.SingleOrDefaultAsync(p => p.UserId == Guid.Parse(userId));
        }

        public async Task<Profile> UpdateProfile(Profile profile)
        {
            var data = await FetchProfile(profile.UserId.ToString());
            if (data == null)
            {
                await _context.profiles.AddAsync(profile);
                data = profile;
            }
            else
            {
                data.Address = profile.Address;
                data.DateOfBirth = profile.DateOfBirth;
                data.FirstName = profile.FirstName;
                data.LastName = profile.LastName;
                data.StateId = profile.StateId;
                data.ProvinceId = profile.ProvinceId;
            }
            await Save();
            return data;
        }

        

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<UserLike> GetMarkedUser(string actorId, string targetId)
        {
            return await _context.user_likes.FirstOrDefaultAsync(u=>u.UserId == Guid.Parse(actorId) && u.ProfileId == Guid.Parse(targetId));
        }

        public async Task<UserLike> Add(UserLike data)
        {
            await _context.user_likes.AddAsync(data);
            await Save();
            return data;
        }

        public async Task Delete(UserLike data)
        {
            _context.user_likes.Remove(data);
            await Save();
        }
    }
}
