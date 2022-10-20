using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Paroo.Helpers.Annotations;

namespace Paroo.Entities.UserAggregate
{
    public class Profile
    {
        public int Id { get; set; }
        public int StateId { get; set; }
        public string Picture { get; set; }
        public int ProvinceId { get; set; }
        public int Points { get; set; }
        public Guid UserId { get; set; }

        [Required]
        [MaxLength(11)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(11)]
        public string LastName { get; set; }

        [DateMinimumAge(18, ErrorMessage="{0} must be someone at least {1} years of age")]
        [DataType(DataType.Date)]
        public DateTime DateOfBirth { get; set; }

        [Phone]
        [Required]
        [MaxLength(11)]
        public string PhoneNumber { get; set; }

        [MaxLength(200)]
        public string Address { get; set; }

        public ICollection<UserLike> UserLikes { get; set; } = new List<UserLike>();
    }
}
