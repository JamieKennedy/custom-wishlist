namespace Entities.Models.Error.Exceptions
{
    public class RefreshTokenBadRequest : BadRequestException
    {
        public RefreshTokenBadRequest(string message) : base(message) { }
        public RefreshTokenBadRequest() : base("Invalid Refresh Token") { }
    }
}