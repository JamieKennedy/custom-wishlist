using Entities.Models.Authentication;
using Repository.Contracts;

namespace Repository
{
    public class TokenRepository : RepositoryBase<Token>, ITokenRepository
    {
        public TokenRepository(RepositoryContext repositoryContext) : base(repositoryContext) { }
        public void CreateToken(Token token)
        {
            Create(token);
        }

        public Token? GetByToken(string refreshToken, bool trackChanges)
        {
            return FindByCondition(token => token.RefreshToken == refreshToken, trackChanges).FirstOrDefault();
        }

        public IEnumerable<Token> GetActiveTokensByUserId(string userId, bool trackChanges)
        {
            return FindByCondition(token => token.UserId == userId && token.Active, trackChanges);
        }

        public IEnumerable<Token> GetTokensByUserId(string userId, bool trackChanges)
        {
            return FindByCondition(token => token.UserId == userId, trackChanges);
        }
    }
}