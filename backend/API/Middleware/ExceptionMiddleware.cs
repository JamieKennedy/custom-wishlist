using Entities.Models.Error;
using Entities.Models.Error.Exceptions;

using LoggerService;
using LoggerService.Contracts;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Middleware
{
    public static class ExceptionMiddleware
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder builder, ILoggerManager logger)
        {
            builder.UseExceptionHandler(app =>
            {
                app.Run(async context =>
                {
                    context.Response.ContentType = "application/json";

                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();

                    if (contextFeature != null)
                    {
                        // Exception has been thrown in the application
                        var error = contextFeature.Error;

                        var statusCode = GetStatusCodeFromException(error);
                        var message = GetMessageFromException(error);

                        var errorDto = new ErrorDto(statusCode, message);

                        // Log the error
                        logger.LogError(error.ToString());

                        context.Response.StatusCode = statusCode;

                        await context.Response.WriteAsync(JsonConvert.SerializeObject(errorDto, Formatting.Indented));
                    }
                });
            });
        }

        private static int GetStatusCodeFromException(Exception error)
        {
            return error switch
            {
                BadRequestException => BadRequestException.StatusCode,
                UnauthorizedException => UnauthorizedException.StatusCode,
                _ => StatusCodes.Status500InternalServerError
            };
        }

        // currently just returns the exception message but can be expanded based on exception type
        private static string GetMessageFromException(Exception error)
        {
            return error.Message;
        }
    }
}