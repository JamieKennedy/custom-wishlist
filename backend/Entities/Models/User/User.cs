using Entities.Models.Authentication;
using Microsoft.AspNetCore.Identity;

namespace Entities.Models.User
{
    public class User : IdentityUser
    {
        public string RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiry { get; set; }
    }
}