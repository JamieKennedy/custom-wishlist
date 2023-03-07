using System.ComponentModel.DataAnnotations;

namespace Entities.Models.User
{
    public record UserRegistrationDto
    {
        [Required]
        public string Email { get; init; }
        [Required]
        public string Password { get; init; }
    }
}