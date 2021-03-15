using System.ComponentModel.DataAnnotations;

namespace EstablishmentService.Models.User
{
    public class ChangeUserPasswordRequest
    {
        [Required]
        public string NewPassword { get; set; }
    }
}
