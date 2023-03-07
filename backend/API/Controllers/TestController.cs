using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [Authorize]
        [HttpGet()]
        public Task<IActionResult> Get()
        {
            var result = new List<string> { "Test1", "Test2" };
            return Task.FromResult<IActionResult>(Ok(result));
        }
    }
}