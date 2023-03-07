using Microsoft.AspNetCore.Http;

namespace Entities.Models.Error.Exceptions
{
    public class NotFoundException : Exception
    {
        public static int StatusCode => StatusCodes.Status404NotFound;

        public NotFoundException(string message) : base(message) { }
    }
}