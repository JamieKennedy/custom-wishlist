using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models.Authentication
{
    public class Token
    {
        [Key]
        public Guid TokenId { get; set; }

        [ForeignKey("User")]
        public string UserId { get; set; }

        [Required]
        public string RefreshToken { get; set; }

        [Required]
        public DateTime Expires { get; set; }

        [Required]
        [DefaultValue(false)]
        public bool Active { get; set; }

        public User.User User { get; set; }
    }
}