﻿using LoggerService.Contracts;

using Microsoft.Extensions.Configuration;

using Serilog;

namespace LoggerService
{
    public class LoggerManager : ILoggerManager
    {
        private readonly ILogger _logger;

        public LoggerManager(IConfiguration configuration)
        {
            _logger = new LoggerConfiguration().ReadFrom.Configuration(configuration).CreateLogger();
        }

        public void LogDebug(string message)
        {
            _logger.Debug(message);
        }

        public void LogError(string message)
        {
            _logger.Error(message);
        }

        public void LogInfo(string message)
        {
            _logger.Information(message);
        }

        public void LogWarning(string message)
        {
            _logger.Warning(message);
        }
    }
}