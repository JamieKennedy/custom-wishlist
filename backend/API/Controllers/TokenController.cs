using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities.DataTransferObjects.Authentication;
using Entities.Models.Authentication;
using Entities.Models.Error.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly IServiceManager _service;

        public TokenController(IServiceManager service)
        {
            _service = service;
        }

        [HttpPost("Refresh")]
        public async Task<IActionResult> Refresh(bool keepLoggedIn = true)
        {
            if (!Request.Cookies.TryGetValue("RefreshToken", out var refreshToken))
            {
                throw new BadRequestException("No refresh token specified");
            }

            var newTokenDto = await _service.AuthenticationService.RefreshToken(new RefreshTokenDto(refreshToken), false);

            Response.Cookies.Append("RefreshToken", newTokenDto.RefreshToken, new CookieOptions()
            {
                Expires = keepLoggedIn ? DateTimeOffset.Now.AddDays(7) : null,
                HttpOnly = true
            });

            return Ok(newTokenDto.AccessToken);
        }
    }
}