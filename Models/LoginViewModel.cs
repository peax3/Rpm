using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Paroo.Models
{
    /// <summary>
    /// Login View Model
    /// </summary>
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Please enter your password")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Please enter your email")]
        [DisplayName("Email")]
        public string Email { get; set; }

        [Display(Name = "Remember Me")]
        public bool RememberMe { get; set; }


        [BindProperty(Name = "g-Recaptcha-Response")]
        public string CaptchaResponse { get; set; }
    }
}