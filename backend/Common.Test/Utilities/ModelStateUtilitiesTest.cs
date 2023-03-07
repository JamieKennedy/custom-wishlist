using Common.Utilities;
using Entities.Models.User;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Common.Test.Utilities
{
    public class ModelStateUtilitiesTest
    {
        [Fact]
        public void FormatModelStateErrors_NoErrorsReturnsEmptyString()
        {
            // Arrange
            var modelState = new ModelStateDictionary();

            // Act
            var result = ModelStateUtilities.FormatModelStateErrors(modelState);

            // Assert
            Assert.Equal(string.Empty, result);
        }
    }
}