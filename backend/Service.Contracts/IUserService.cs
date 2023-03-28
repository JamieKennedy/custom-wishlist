using Entities.Models.User;

namespace Service.Contracts
{
    public interface IUserService
    {
        Task<UserDto> GetUserByEmail(string email);
        Task<UserDto> GetUserById(string id);
    }
}