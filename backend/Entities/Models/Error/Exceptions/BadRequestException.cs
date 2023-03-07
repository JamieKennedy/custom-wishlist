using Microsoft.AspNetCore.Http;

namespace Entities.Models.Error.Exceptions
{
    public class BadRequestException : Exception
    {
        public static int StatusCode => StatusCodes.Status400BadRequest;

        public BadRequestException(string message) : base(message)
        {
        }
    }
}