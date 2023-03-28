using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        public UserController(IServiceManager serviceManager)
        {
            _serviceManager = serviceManager;
        }

        [Authorize]
        [HttpGet("GetByEmail")]
        public async Task<IActionResult> GetByEmail(string email)
        {
            var user = await _serviceManager.UserService.GetUserByEmail(email);

            return Ok(user);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var user = await _serviceManager.UserService.GetUserById(id);

            return Ok(user);
        }


    }
}