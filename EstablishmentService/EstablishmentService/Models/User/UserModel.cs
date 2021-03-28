using EstablishmentService.Models.Establishment;
using EstablishmentService.Models.File;
using System.Collections.Generic;

namespace EstablishmentService.Models.User
{
    public class UserModel
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Role { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public ImageModel Image { get; set; }
    }
}
