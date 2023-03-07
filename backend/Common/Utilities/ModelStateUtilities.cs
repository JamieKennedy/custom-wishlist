using System.Net.Http.Json;
using System.Text;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using Common.Models.ModelState;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;

namespace Common.Utilities
{
    public static class ModelStateUtilities
    {
        public static string FormatModelStateErrors(ModelStateDictionary modelState)
        {
            var errors = modelState
                         .Where(x => x.Value is { Errors.Count: > 0 })
                         .Select(error => new ModelStateError(error.Key, error.Value!.Errors));

            return !errors.Any() ? string.Empty : JsonConvert.SerializeObject(errors, Formatting.None);
        }
    }
}