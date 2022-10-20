using System.ComponentModel.DataAnnotations;

namespace Paroo.Models
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
