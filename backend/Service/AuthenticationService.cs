using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using Entities.DataTransferObjects.Authentication;
using Entities.Models.Authentication;
using Entities.Models.Error.Exceptions;
using Entities.Models.User;
using LoggerService.Contracts;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Repository.Contracts;
using Service.Contracts;

namespace Service
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly ILoggerManager _logger;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IRepositoryManager _repository;

        private User? _user;

        public AuthenticationService(ILoggerManager logger, IMapper mapper, UserManager<User> userManager, IConfiguration configuration, IRepositoryManager repository)
        {
            _logger = logger;
            _mapper = mapper;
            _userManager = userManager;
            _configuration = configuration;
            _repository = repository;
        }

        public async Task<IdentityResult> RegisterUser(UserRegistrationDto userRegistrationDto)
        {
            var user = _mapper.Map<User>(userRegistrationDto);

            var result = await _userManager.CreateAsync(user, userRegistrationDto.Password!);

            return result;
        }

        public async Task<bool> AuthenticateUser(UserAuthenticationDto userAuthenticationDto)
        {
            _user = await _userManager.FindByEmailAsync(userAuthenticationDto.Email);

            var result = (_user != null && await _userManager.CheckPasswordAsync(_user, userAuthenticationDto.Password));

            if (!result)
            {
                _logger.LogWarning($"Authentication failed for email: {userAuthenticationDto.Email}");
            }

            return result;
        }

        public TokenDto CreateToken(bool populateRefreshTokenExpiry)
        {
            var signingCredentials = GetSigningCredentials();
            var claims = GetClaims();
            var tokenOptions = GenerateTokenOptions(signingCredentials, claims);

            var refreshToken = CreateRefreshToken();

            var accessToken = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return new TokenDto(accessToken, refreshToken);
        }

        public async Task<TokenDto> RefreshToken(RefreshTokenDto refreshTokenDto, bool trackChanges)
        {
            var token = _repository.Token.GetByToken(refreshTokenDto.RefreshToken, trackChanges);
            if (token == null)
            {
                throw new RefreshTokenInvalidException("Invalid refresh token");
            }

            if (!token.Active)
            {
                // Inactive token attempted to be used, invalidate all refresh tokens
                // to maintain security
                var activeTokens = _repository.Token.GetActiveTokensByUserId(token.UserId, true).ToList();

                activeTokens.ForEach(activeToken => activeToken.Active = false);
                _repository.Save();

                // Return unauthorized response
                throw new RefreshTokenInvalidException("Inactive token");
            }

            _user = await _userManager.FindByIdAsync(token.UserId);
            token.User = _user;

            // Create new token
            return CreateToken(false);
        }

        private JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");

            var tokenOptions = new JwtSecurityToken(
                issuer: jwtSettings["ValidIssuer"],
                audience: jwtSettings["ValidAudience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings["AccessTokenExpiryMinutes"])),
                signingCredentials: signingCredentials
            );

            return tokenOptions;

        }

        private SigningCredentials GetSigningCredentials()
        {
            var jwtSecret = _configuration["JwtSettings:Secret"];

            if (string.IsNullOrEmpty(jwtSecret))
            {
                throw new ConfigurationItemNotFoundException("JwtSettings:Secret");
            }

            var key = Encoding.UTF8.GetBytes(jwtSecret);
            var secret = new SymmetricSecurityKey(key);

            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        private List<Claim> GetClaims()
        {
            if (_user == null)
            {
                return new List<Claim>();
            }

            var claims = new List<Claim>
            {
                new ("Id", _user.Id),
                new ("Email", _user.Email ?? string.Empty),
            };

            return claims;
        }

        private string CreateRefreshToken()
        {
            var activeTokens = _repository.Token.GetActiveTokensByUserId(_user!.Id, true).ToList();

            if (activeTokens.Any())
            {
                // User has active tokens, invalidate all before creating a new one
                activeTokens.ToList().ForEach(token =>
                {
                    token.Active = false;
                });
            }

            var newToken = GenerateRefreshToken();

            // Repeatedly attempt to retrieve the token using this string. If it exists
            // create a new one. Unlikely to get conflicts but here just in case
            while (_repository.Token.GetByToken(newToken, false) != null)
            {
                newToken = GenerateRefreshToken();
            }

            // Get refresh token expiry from config
            var expiryDays = _configuration.GetSection("JwtSettings")["RefreshTokenExpiryDays"];

            if (expiryDays == null)
            {
                throw new ConfigurationItemNotFoundException("JwtSettings:RefreshTokenExpiryDays");
            }

            var tokenToInsert = new Token()
            {
                UserId = _user!.Id,
                RefreshToken = newToken,
                Expires = DateTime.Now.AddDays(int.Parse(expiryDays)),
                Active = true
            };

            // Add the token to the db
            _repository.Token.CreateToken(tokenToInsert);
            _repository.Save();

            return newToken;
        }

        private static string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);

            return Convert.ToBase64String(randomNumber);
        }
    }
}