using System.Collections;
using Entities.Models.Authentication;

namespace Repository.Contracts
{
    public interface ITokenRepository
    {
        void CreateToken(Token token);
        Token? GetByToken(string refreshToken, bool trackChanges);
        IEnumerable<Token> GetActiveTokensByUserId(string userId, bool trackChanges);
        IEnumerable<Token> GetTokensByUserId(string userId, bool trackChanges);
    }
}