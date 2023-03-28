using System.Net;
using Elfie.Serialization;
using Entities.Models.Error.Exceptions;
using Entities.Models.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using Service.Contracts;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        public AuthenticationController(IServiceManager serviceManager)
        {
            _serviceManager = serviceManager;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterUser([FromBody] UserRegistrationDto userRegistrationDto)
        {
            var result = await _serviceManager.AuthenticationService.RegisterUser(userRegistrationDto);

            // Successfully created the user
            if (result.Succeeded) return StatusCode(201);

            // Error creating the user, get the errors and return
            foreach (var error in result.Errors) ModelState.TryAddModelError(error.Code, error.Description);

            return BadRequest(ModelState);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Authenticate([FromBody] UserAuthenticationDto userAuthenticationDto)
        {
            if (!await _serviceManager.AuthenticationService.AuthenticateUser(userAuthenticationDto)) return Unauthorized();

            var tokenDto = _serviceManager.AuthenticationService.CreateToken(true);

            Response.Cookies.Append("RefreshToken", tokenDto.RefreshToken, new CookieOptions()
            {
                Expires = DateTimeOffset.Now.AddDays(7),
                HttpOnly = true
            });

            return Ok(tokenDto.AccessToken);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            if (!Request.Cookies.TryGetValue("RefreshToken", out var refreshToken))
            {
                throw new BadRequestException("No refresh token specified");
            }

            Response.Cookies.Append("RefreshToken", refreshToken, new CookieOptions()
            {
                Expires = DateTimeOffset.MinValue,
                HttpOnly = true
            });

            return Ok();
        }
    }
}