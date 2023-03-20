using Repository.Contracts;

namespace Repository
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly RepositoryContext _repositoryContext;
        private readonly Lazy<ITokenRepository> _tokenRepository;

        public RepositoryManager(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
            _tokenRepository = new Lazy<ITokenRepository>(() => new TokenRepository(repositoryContext));
        }

        public ITokenRepository Token => _tokenRepository.Value;

        public void Save()
        {
            _repositoryContext.SaveChanges();
        }
    }
}