using System.ComponentModel.DataAnnotations;

namespace Entities.Models.User
{
    public record UserAuthenticationDto
    {
        [Required]
        public string Email { get; init; }
        [Required]
        public string Password { get; init; }
        public bool KeepLoggedIn { get; init; }
    };
}