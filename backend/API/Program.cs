using System.Configuration;
using API.Extensions;
using API.Middleware;
using Common.Utilities;
using Entities;
using Entities.Models.Error;
using Entities.Models.Error.Exceptions;
using LoggerService.Contracts;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("Localhost", policyBuilder =>
                {
                    policyBuilder.WithOrigins("http://localhost:5173")
                                 .AllowAnyMethod()
                                 .AllowAnyHeader()
                                 .AllowCredentials();

                });
            });

            // Logger
            builder.Services.ConfigureLoggerService();

            // Db Context
            builder.Services.ConfigureSqlContext(builder.Configuration);

            // Auth
            builder.Services.AddAuthentication();
            builder.Services.ConfigureIdentity();
            builder.Services.ConfigureJwt(builder.Configuration);

            // Managers
            builder.Services.ConfigureRepositoryManager();
            builder.Services.ConfigureServiceManager();

            // Auto Mapper
            builder.Services.AddSingleton(MappingProfile.CreateMapper());

            builder.Services.AddControllers();



            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // custom handling of invalid model state
            builder.Services.PostConfigure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = context =>
                {
                    const int statusCode = StatusCodes.Status400BadRequest;
                    var message = ModelStateUtilities.FormatModelStateErrors(context.ModelState);

                    var logger = context.HttpContext.RequestServices.GetRequiredService<ILoggerManager>();
                    logger.LogError(message);

                    return new BadRequestObjectResult(new ErrorDto(statusCode, message));
                };
            });

            builder.Services.AddMvc();

            var app = builder.Build();

            var logger = app.Services.GetRequiredService<ILoggerManager>();
            app.ConfigureExceptionHandler(logger);

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseCors("Localhost");
            }
            else
            {
                app.UseHttpsRedirection();
            }

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}