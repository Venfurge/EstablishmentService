using System.ComponentModel.DataAnnotations;

namespace EstablishmentService.Models.Auth
{
    public class LoginRequest
    {
        [Required]
        public string Login { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
