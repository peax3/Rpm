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
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Paroo.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IProfileService _profileService;
        private readonly IIdentityService _identityService;
        private readonly IStateService _stateService;
        private readonly ICategoryService _categoryService;
        private readonly IProductService _productService;

        public HomeController(IProductService productService, ICategoryService categoryService, ILogger<HomeController> logger, IProfileService profileService,  IIdentityService identityService, IStateService stateService)
        {
            _logger = logger;
            _profileService = profileService ?? throw new ArgumentNullException(nameof(profileService));
            _stateService = stateService ?? throw new ArgumentNullException(nameof(stateService));
            _identityService = identityService ?? throw new ArgumentNullException(nameof(identityService));
            _categoryService = categoryService ?? throw new ArgumentNullException(nameof(categoryService));
            _productService = productService ?? throw new ArgumentNullException(nameof(productService));
        }

        public async Task<ActionResult> Fetcher(string cat)
        {
            HashSet<string> defaults = new HashSet<string> { "kids", "women", "men" };
            if(!defaults.Contains(cat.ToLower())) return NotFound();
            var userId = Guid.Empty.ToString();
            if(User.Identity.IsAuthenticated) userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var product = await _productService.FetchProductByCat(cat.ToLower(), 1, 20, userId, 0, 0, 0, 0);
            ViewData["product"] =  product;
            return View();
        }


        public async Task<ActionResult> FetchProducts(int catId, int page, int size, int count, int maximum, int minimum, int stateId)
        {
            var userId = Guid.Empty.ToString();
            if (User.Identity.IsAuthenticated) userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var products = await _productService.FetchProductByCat(catId, page, size, userId, count, maximum, minimum, stateId);
            return Ok(products);
        }

        public async Task<IActionResult> Index()
        {
            if (!User.Identity.IsAuthenticated) return View();
            //if a user is authenticated
            //we make the profile call and 
            //if his profile is null we
            //redirect the user to update it
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var item = await _profileService.FetchProfile(userId);
            ViewData["profile"] = item;

            //one more query
            //might mive this away

            var cats = await _categoryService.FetchCategories(5);
            ViewData["cats"] = cats;
            return View();
        }

        [Authorize]
        [Route("account")]
        public async Task<IActionResult> MyAccount()
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var item = await _profileService.FetchProfile(userId);
            ViewData["profile"] = item;
            return View();
        }

        [Authorize]
        [Route("account/settings/")]
        public async Task<IActionResult> Settings()
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var item = await _profileService.FetchProfile(userId);
            ViewData["profile"] = item;
            return View("~/Views/Home/MyAccount.cshtml");
        }

        [Authorize]
        [Route("account/update-profile")]
        public async Task<IActionResult> UpdateProfile()
        {
            return View("MyAccount");
        }


        [HttpGet, Route("Users/{username}", Name = "userprofile"), Route("Account/my-balance", Name = "my-balance")]
        public async Task<IActionResult> MyProfile()
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var profile = await _profileService.FetchProfile(userId);
            if (profile == null) return RedirectToAction("UpdateProfile", "Home");
            ViewData["profile"] = profile;

            //switch (ControllerContext.ActionDescriptor.AttributeRouteInfo.Name)
            //{
            //    // ...
            //}
            var go = ControllerContext.ActionDescriptor.AttributeRouteInfo.Name;
            return View("~/Views/Home/MyAccount.cshtml");
        }

        public IActionResult Privacy()
        {
            return View();
        }


        public async Task<IActionResult> Search(string query, string resource)
        {
            bool isAjax = HttpContext.Request.Headers["X-Requested-With"] == "XMLHttpRequest";
            if (isAjax)
                return Json(new { redirectTo = Url.Action("Index", "ControllerAction") });
            else
                return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }


        public async Task<IActionResult> FetchStates()
        {
            var cats = await _stateService.FetchStates();
            return Ok(cats);
        }
    }
}
