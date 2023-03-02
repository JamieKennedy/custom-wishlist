using LoggerService;

using Microsoft.EntityFrameworkCore;

using Repository;

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
    }
}
