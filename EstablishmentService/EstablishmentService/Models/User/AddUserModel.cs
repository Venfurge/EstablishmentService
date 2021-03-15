using System.ComponentModel.DataAnnotations;

namespace EstablishmentService.Models.User
{
    public class AddUserModel
    {
        [Required]
        public string Login { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Role { get; set; }
    }
}
