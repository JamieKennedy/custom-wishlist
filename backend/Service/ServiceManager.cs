using AutoMapper;

using LoggerService;

using Microsoft.Extensions.Configuration;

using Repository.Contracts;

using Service.Contracts;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class ServiceManager : IServiceManager
    {
        public ServiceManager(IRepositoryManager repositoryManager,
                              LoggerManager loggerManager,
                              IMapper mapper,
                              IConfiguration configuration)
        {

        }
    }
}
