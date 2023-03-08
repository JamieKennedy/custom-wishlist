using Entities.Models.Authentication;

namespace Entities.Models.User
{
    public record UserDto
    {
        public string Id { get; init; }
        public string UserName { get; init; }
        public string Email { get; init; }
        public bool EmailConfirmed { get; init; }
        public string PhoneNumber { get; init; }
        public bool PhoneNumberConfirmed { get; init; }
        public bool TwoFactorEnabled { get; init; }
        public string RefreshToken { get; init; }
        public DateTime? RefreshTokenExpiry { get; init; }
    }
}