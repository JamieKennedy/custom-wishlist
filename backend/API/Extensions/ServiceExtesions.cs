using LoggerService;

using Microsoft.EntityFrameworkCore;

using Repository;
using Repository.Contracts;

using Service;
using Service.Contracts;

using System.Data.SqlClient;

namespace API.Extensions
{
    public static class ServiceExtesions
    {
        public static void ConfigureLoggerService(this IServiceCollection services)
        {
            services.AddSingleton<LoggerManager, LoggerManager>();
        }

        public static void ConfigureSqlContext(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("SqlConnection");

            services.AddDbContext<RepositoryContext>(options =>
            {
                options.UseSqlServer(connectionString,
                                     b => b.MigrationsAssembly("API"));
            });
        }

        public static void ConfigureRepositoryManager(this IServiceCollection services)
        {
            services.AddScoped<IRepositoryManager, RepositoryManager>();
        }

        public static void ConfigureServiceManager(this IServiceCollection services)
        {
            services.AddScoped<IServiceManager, ServiceManager>();
        }
    }
}
