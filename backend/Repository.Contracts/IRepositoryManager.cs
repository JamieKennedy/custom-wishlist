namespace Repository.Contracts
{
    public interface IRepositoryManager
    {
        ITokenRepository Token { get; }
        void Save();
    }
}