using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities.DataTransferObjects.Authentication;
using Entities.Models.Authentication;
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
        public async Task<IActionResult> Refresh([FromBody] RefreshTokenDto tokenDto)
        {
            var newTokenDto = await _service.AuthenticationService.RefreshToken(tokenDto, false);

            return Ok(newTokenDto);
        }
    }
}