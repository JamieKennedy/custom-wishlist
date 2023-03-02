﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LoggerService.Contracts
{
    internal interface ILoggerManager
    {
        void LogInfo(string message);
        void LogWarning(string message);
        void LogDebug(string message);
        void LogError(string message);
    }
}
