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
    [Authorize]
    public class ProfileController : Controller
    {
        private readonly ILogger<ProfileController> _logger;
        private readonly IProfileService _profileService;
        private readonly IIdentityService _identityService;
        private readonly IStateService _stateService;
        private readonly IProductService _productService;


        public ProfileController(ILogger<ProfileController> logger, IProductService productService, IProfileService profileService,  IIdentityService identityService, IStateService stateService)
        {
            _logger = logger;
            _profileService = profileService ?? throw new ArgumentNullException(nameof(profileService));
            _stateService = stateService ?? throw new ArgumentNullException(nameof(stateService));
            _identityService = identityService ?? throw new ArgumentNullException(nameof(identityService));
            _productService = productService ?? throw new ArgumentNullException(nameof(productService));
        }


        public async Task<IActionResult> GetActiveBids(int size, int page, int total)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var bids = await _profileService.GetActiveBids(size, page, userId, total);
            return Ok(bids);
        }


        public async Task<IActionResult> GetParooStats()
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var stats = await _profileService.GetParooStats(userId);
            return Ok(stats);
        }

        [AllowAnonymous]
        public async Task<IActionResult> GetProfileStats(string userId)
        {
            var viewer = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var stats = await _profileService.GetProfileStat(userId, viewer);
            return Ok(stats);
        }


      
    }
}
