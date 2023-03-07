namespace Entities.Models.Error.Exceptions
{
    public class ConfigurationItemNotFoundException : NotFoundException
    {
        public ConfigurationItemNotFoundException(string key) : base($"Configuration item with key {key} not found") {}
    }
}