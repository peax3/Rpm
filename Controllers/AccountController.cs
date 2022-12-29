using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Corper.API.Application.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Paroo.Entities.UserAggregate;
using Paroo.Models;
using Paroo.Repositories;
using Paroo.Repositories.Interfaces;
using Paroo.Services;
using Paroo.Services.ParooServices.interfaces;

namespace Paroo.Controllers
{
    [Authorize]

    public class AccountController : Controller
    {
        private readonly ILogger<AccountController> _logger;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IMailService _mailService;
        private readonly IProfileQueries _profileQueries;
        private readonly IProfileRepository _profileRepository;
        private readonly IProfileService _profileService;
        private readonly CaptchaVerificationService _verificationService;
        private readonly IConfiguration _configuration;

        public string CaptchaClientKey { get; set; }

        public AccountController(
            UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IMailService mailService,
            IConfiguration configuration,
            CaptchaVerificationService verificationService,
            IProfileQueries profileQueries,
            IProfileRepository profileRepository,
            IProfileService profileService,
            SignInManager<IdentityUser> signInManager, ILogger<AccountController> logger)
        {
            _configuration = configuration;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _logger = logger;
            _verificationService = verificationService;
            _profileService = profileService ?? throw new ArgumentNullException(nameof(profileService));
            _mailService = mailService;
            _profileRepository = profileRepository ?? throw new ArgumentNullException(nameof(profileRepository));
            CaptchaClientKey = _configuration["Captcha:ClientKey"];
        }

        //[AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateRole(string name)
        {
            bool x = await _roleManager.RoleExistsAsync(name);
            if (!x)
            {
                var role = new IdentityRole(name);
                await _roleManager.CreateAsync(role);
            }

            return Ok();
        }


        [HttpPost]
        public async Task<IActionResult> AddUserToRole(string userId, string roleId)
        {
            var role = await _roleManager.FindByNameAsync(roleId);
            if (role != null)
            {
                var user = await _userManager.FindByIdAsync(userId);
                if(! await _userManager.IsInRoleAsync(user, roleId))
                {
                    await _userManager.AddToRoleAsync(user, role.Name);
                }
                
            }

            return Ok();
        }


        [HttpDelete]
        public async Task<IActionResult> RemoveRole(string userId, string roleId)
        {
            var role = await _roleManager.FindByNameAsync(roleId);
            if (role != null)
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (await _userManager.IsInRoleAsync(user, roleId))
                {
                    await _userManager.RemoveFromRoleAsync(user, role.Name);
                }

            }

            return Ok();
        }

        [AllowAnonymous]
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            // validate input
            var requestIsValid = await _verificationService.IsCaptchaValid(model.CaptchaResponse);

            if (ModelState.IsValid && requestIsValid)
            {
                var user = new IdentityUser
                {
                    UserName = model.Username,
                    Email = model.Email,
                };

                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {

                    await _signInManager.SignInAsync(user, isPersistent: false);

                    //send confirmation email here
                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    var callbackUrl = Url.Action("VerifyEmail", "Account", new { userId = user.Id, code }, HttpContext.Request.Scheme);
                    var request = new MailRequest
                    {
                        ToEmail = user.Email,
                        Body = callbackUrl,
                        Subject = "Password recovery"
                    };
                    await _mailService.SendEmailAsync(request);

                    ViewData["msg"] = "Registration successful, please confirm your email.";
                    TempData["user"] = JsonConvert.SerializeObject(model);
                    return RedirectToAction(nameof(ConfirmEmail));
                }

                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                }
                if (!requestIsValid)
                {
                    ModelState.AddModelError(string.Empty, "Failed recaptcha test");
                }

                ModelState.AddModelError(string.Empty, "Invalid Login Attempt");

            }
            return View(model);
        }
   
        [HttpGet]
        [AllowAnonymous]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginViewModel model, string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;

            // validate input
            var requestIsValid = await _verificationService.IsCaptchaValid(model.CaptchaResponse);

            //if (model != null && ModelState.IsValid && !requestIsValid)
            if (model != null && ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user != null)
                {
                    var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, lockoutOnFailure: false);
                    if (result.Succeeded && !await AddConfirmEmailError(user) && !AddUserEnabledError(user))
                    {
                        result = await _signInManager.PasswordSignInAsync(user, model.Password, model.RememberMe, lockoutOnFailure: false);

                        if (result.Succeeded)
                        {
                            return RedirectToAction("Index", "Home");
                        }
                    }
                }
                ModelState.AddModelError(string.Empty, "Invalid login attempt.");
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Email and password are required");
                if (!requestIsValid)
                {
                    ModelState.AddModelError(string.Empty, "Failed recaptcha test");
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        [AllowAnonymous]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            return RedirectToAction("Login");
        }

        [HttpGet("account/confirm-email")]
        [AllowAnonymous]
        public IActionResult ConfirmEmail()
        {
            return View();
        }

        [HttpPost("account/update_profile")]
        public async Task<IActionResult> UpdateProfile(Profile model)
        {
            if (model == null || !ModelState.IsValid) return BadRequest();
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            model.UserId = Guid.Parse(userId);
            var item = await _profileRepository.UpdateProfile(model);
            return Ok(item);
        }

        [HttpPost("account/u_account_profile")]
        public async Task<IActionResult> UpdateAccountProfile(Profile model, string part)
        {
            if (model == null || !ModelState.IsValid) return BadRequest();
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            model.UserId = Guid.Parse(userId);
            var item = await _profileService.UpdateProfile(model, part);
            return Ok(item);
        }

        [HttpGet("account/verify-email")]
        [AllowAnonymous]
        public async Task<IActionResult> VerifyEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return RedirectToAction(nameof(Register));
            }

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }

            var result = await _userManager.ConfirmEmailAsync(user, code);
            if (user.LockoutEnabled)
            {
                user.LockoutEnabled = false;
                await _userManager.UpdateAsync(user);
            }
           

            if (result.Succeeded)
            {
                return RedirectToAction("Index", "Home", new { confirmed = true });
            }

            return NotFound();
        }

        public async Task<bool> AddConfirmEmailError(IdentityUser user)
        {
            if (await _userManager.IsEmailConfirmedAsync(user)) return false;
            ModelState.AddModelError(string.Empty, "You must confirm your email.");
            return true;

        }

        private bool AddUserEnabledError(IdentityUser localUser)
        {
            if (localUser is { LockoutEnabled: false }) return false;
            ModelState.AddModelError(string.Empty, "Your account is disabled. Please contact an administrator.");
            return true;
        }
    }
}
