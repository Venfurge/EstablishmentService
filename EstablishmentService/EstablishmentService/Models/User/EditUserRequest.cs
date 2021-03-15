using System.ComponentModel.DataAnnotations;

namespace EstablishmentService.Models.User
{
    public class EditUserRequest
    {
        [Required]
        public string Login { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
    }
}
