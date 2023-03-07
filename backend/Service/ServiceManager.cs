using AutoMapper;
using Entities.Models.User;
using LoggerService.Contracts;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Repository.Contracts;
using Service.Contracts;

namespace Service
{
    public class ServiceManager : IServiceManager
    {
        private readonly Lazy<IAuthenticationService> _authenticationService;

        public ServiceManager(IRepositoryManager repositoryManager,
                              ILoggerManager loggerManager,
                              IMapper mapper,
                              IConfiguration configuration,
                              UserManager<User> userManager)
        {
            _authenticationService = new Lazy<IAuthenticationService>(
                () => new AuthenticationService(loggerManager, mapper, userManager, configuration)
            );
        }

        public IAuthenticationService AuthenticationService => _authenticationService.Value;
    }
}