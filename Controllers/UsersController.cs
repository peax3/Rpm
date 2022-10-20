using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Paroo.Models;
using System;
using System.Diagnostics;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Paroo.Repositories.Interfaces;
using Paroo.Services;
using Paroo.Services.ParooServices.interfaces;

namespace Paroo.Controllers
{

    public class UsersController : Controller
    {
        private readonly ILogger<UsersController> _logger;
        private readonly IProfileService _profileService;
        private readonly IIdentityService _identityService;
        private readonly IStateService _stateService;
        private readonly IProductService _productService;


        public UsersController(ILogger<UsersController> logger, IProductService productService, IProfileService profileService,  IIdentityService identityService, IStateService stateService)
        {
            _logger = logger;
            _profileService = profileService ?? throw new ArgumentNullException(nameof(profileService));
            _stateService = stateService ?? throw new ArgumentNullException(nameof(stateService));
            _identityService = identityService ?? throw new ArgumentNullException(nameof(identityService));
            _productService = productService ?? throw new ArgumentNullException(nameof(productService));
        }


        [Route("users/{username}")]
        public async Task<IActionResult> Index(string username)
        {
            var user = await _profileService.FetchUserByUserName(username);
            if(user == null) { return NotFound(); }

            var item = await _profileService.FetchProfile(user.Id);
            ViewData["profile"] = item;
            return View();
        }


        [HttpPost]
        public async Task<IActionResult> MarkFavourite(string userId)
        {
            var actor = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _profileService.MarkFavourite(actor, userId);
            return Ok();
        }


        [HttpGet]
        public async Task<IActionResult> FavProducts(int pageNumber, int pageSize, int count, string userId)
        {
            var users = await _profileService.FetchFavoiriteProducts(pageNumber, pageSize, userId, count);
            return Ok(users);
        }



        [HttpGet]
        public async Task<IActionResult> FavUsers(int pageNumber, int pageSize, int count, string userId)
        {
            var users = await _profileService.FetchFavouriteUsers(pageNumber, pageSize, userId, count);
            return Ok(users);
        }
    }
}
