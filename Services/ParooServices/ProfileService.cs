using Corper.API.Application.Queries;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Routing;
using Paroo.Entities;
using Paroo.Entities.OrderAggregate;
using Paroo.Entities.UserAggregate;
using Paroo.Exceptions;
using Paroo.Models;
using Paroo.Models.Neon;
using Paroo.Repositories.Interfaces;
using Paroo.Services.ParooServices.interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Paroo.Services.ParooServices
{
    public class ProfileService : IProfileService
    {
        private readonly IProfileRepository _profileRepository;
        private readonly IOrderRepository _orderRepository;
        private readonly Corper.API.Application.Queries.IProfileQueries _profileQueries;
        private readonly IProductQueries _productQueries;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IMailService _mailService;
        private readonly IHttpContextAccessor _accessor;
        private readonly LinkGenerator _generator;



        public ProfileService(IProductQueries productQueries, IProfileRepository profileRepository, IOrderRepository orderRepository, LinkGenerator generator, IHttpContextAccessor accessor, IMailService mailService, Corper.API.Application.Queries.IProfileQueries profileQueries, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _profileRepository = profileRepository ?? throw new ArgumentNullException(nameof(profileRepository));
            _orderRepository = orderRepository ?? throw new ArgumentNullException(nameof(orderRepository));
            _productQueries = productQueries ?? throw new ArgumentNullException(nameof(productQueries));
            _profileQueries = profileQueries ?? throw new ArgumentNullException(nameof(profileQueries));
            _userManager = userManager;
            _signInManager = signInManager;
            _accessor = accessor;
            _mailService = mailService;
            _generator = generator;
        }
        public async Task<Profile> FetchProfile(string userId)
        {
            return await _profileRepository.FetchProfile(userId);
        }

        public async Task<IdentityUser> FetchUserByUserName(string username)
        {
            return await _userManager.FindByNameAsync(username);
        }

        public async Task<Profile> UpdateProfile(Profile profile)
        {
            return await _profileRepository.UpdateProfile(profile);
        }

        public async Task<Profile> UpdateProfile(Profile profile, string part)
        {
            var prof = await FetchProfile(profile.UserId.ToString());
            if (prof == null) throw new ParooNotFoundException("Profile not found");
            switch (part)
            {
                case "contact":
                    prof.FirstName = profile.FirstName;
                    prof.LastName = profile.LastName;
                    prof.DateOfBirth = profile.DateOfBirth;
                    prof.Address = profile.Address;
                    prof.StateId = profile.StateId;
                    prof.ProvinceId = profile.ProvinceId;
                    break;
                case "phone":
                    prof.PhoneNumber = profile.PhoneNumber;
                    break;
                case "password":
                    var user = await _userManager.FindByIdAsync(prof.UserId.ToString());
                    if (user == null) throw new ParooNotFoundException("User not found");
                    string resetToken = Convert.ToBase64String(Encoding.UTF8.GetBytes(await _userManager.GeneratePasswordResetTokenAsync(user)));
                    //passed the password into the address pro
                    
                    var resetPassResult = await _userManager.ResetPasswordAsync(user, Encoding.UTF8.GetString(Convert.FromBase64String(resetToken)), profile.Address);
                    if (!resetPassResult.Succeeded)
                    {
                        List<string> er = new List<string>();
                        foreach (var error in resetPassResult.Errors)
                        {
                            er.Add(error.Description);
                        }
                        throw new ParooInvalidOperationException(string.Join(",", er));
                    }
                    await _signInManager.SignOutAsync();
                    break;
                case "confirm":
                    var user1 = await _userManager.FindByIdAsync(prof.UserId.ToString());
                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user1);
                    var callbackUrl = _generator.GetUriByAction(_accessor.HttpContext, "VerifyEmail", "Account", new { userId = user1.Id, code }, _accessor.HttpContext.Request.Scheme);
                    var request = new MailRequest
                    {
                        ToEmail = user1.Email,
                        Body = callbackUrl,
                        Subject = "Password recovery"
                    };
                    await _mailService.SendEmailAsync(request);
                    break;
            }

            await _profileRepository.Save();
            return prof;
        }



        public async Task<QueryResult<ProfileDTO>> GetMembersSummary(int totalCount, int pageSize, int page)
        {
            if (totalCount > 0)
            {
                //no need to get count
                var data = await _profileQueries.GetProfileSummary(totalCount, page, pageSize);
                return data;
            }
            {
                //we need to get the count
                var count = await _profileQueries.GetMemberCount();
                var data = await _profileQueries.GetProfileSummary(count, page, pageSize);
                return data;
            }
        }

        public async Task<QueryResult<Order>> GetActiveBids(int size, int page, string userId, int total)
        {
            return await _orderRepository.GetActiveBids(size, page, userId, total);
        }

        public async Task<ParooStat> GetParooStats(string userId)
        {
            return await _profileQueries.GetParooStats(userId);
        }

        public async Task<ProfileStat> GetProfileStat(string userId, string viewer)
        {
            return await _profileQueries.GetProfileStat(userId, viewer);
        }

        public async Task MarkFavourite(string actorId, string targetId)
        {
            var hasMarked = await _profileRepository.GetMarkedUser(actorId, targetId);
            if (hasMarked == null)
            {
                var newLike = new UserLike
                {
                    UserId = Guid.Parse(actorId),
                    ProfileId = Guid.Parse(targetId)
                };
                await _profileRepository.Add(newLike);

            }
            else
            {
               await  _profileRepository.Delete(hasMarked);
            }
        }

        public async Task<QueryResult<Profile>> FetchFavouriteUsers(int pageNumber, int pageSize, string userId, int count)
        {
            return await _profileQueries.FetchFavouriteUsers(pageNumber, pageSize, userId, count);
        }

        public async Task<QueryResult<ProductQuery>> FetchFavoiriteProducts(int pageNumber, int pageSize, string userId, int count)
        {
            return await _productQueries.FetchFavoiriteProducts(pageNumber, pageSize, userId, count);
        }
    }
        
}
