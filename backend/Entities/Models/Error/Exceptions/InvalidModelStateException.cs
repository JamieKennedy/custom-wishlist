using Common.Utilities;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Entities.Models.Error.Exceptions
{
    public class InvalidModelStateException : BadRequestException
    {
        public InvalidModelStateException(string message) : base(message) { }

        public InvalidModelStateException(ModelStateDictionary modelState) : base(ModelStateUtilities.FormatModelStateErrors(modelState)) { }
    }
}