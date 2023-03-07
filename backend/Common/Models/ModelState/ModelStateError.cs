using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Common.Models.ModelState
{
    public class ModelStateError
    {
        public string Key { get; set; }
        public IEnumerable<string> Errors { get; set; }

        public ModelStateError(string key, ModelErrorCollection errors)
        {
            Key = key;
            Errors = errors.Select(error => error.ErrorMessage);
        }
    }
}