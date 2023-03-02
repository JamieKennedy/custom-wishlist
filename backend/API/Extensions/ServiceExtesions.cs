using LoggerService;

namespace API.Extensions
{
    public static class ServiceExtesions
    {
        public static void ConfigureLoggerService(this IServiceCollection services)
        {
            services.AddSingleton<LoggerManager, LoggerManager>();
        }
    }
}
