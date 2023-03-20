namespace Entities.Models.Error.Exceptions
{
    public class RefreshTokenInvalidException : UnauthorizedException
    {
        public RefreshTokenInvalidException(string message) : base(message) { }
    }
}