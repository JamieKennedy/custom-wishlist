using Microsoft.AspNetCore.Http;

namespace Entities.Models.Error.Exceptions
{
    public class UnauthorizedException : Exception
    {
        public static int StatusCode => StatusCodes.Status401Unauthorized;

        public UnauthorizedException(string message) : base(message)
        {
        }
    }
}