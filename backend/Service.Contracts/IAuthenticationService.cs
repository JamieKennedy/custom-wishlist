using Entities.DataTransferObjects.Authentication;
using Entities.Models.Authentication;
using Entities.Models.User;
using Microsoft.AspNetCore.Identity;

namespace Service.Contracts
{
    public interface IAuthenticationService
    {
        Task<IdentityResult> RegisterUser(UserRegistrationDto userRegistrationDto);
        Task<bool> AuthenticateUser(UserAuthenticationDto userAuthenticationDto);
        TokenDto CreateToken(bool populateRefreshTokenExpiry);
        Task<TokenDto> RefreshToken(RefreshTokenDto refreshTokenDto, bool trackChanges);
    }
}