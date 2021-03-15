using System.Collections.Generic;

namespace EstablishmentService.Entities
{
    public class UserEntity
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }

        public ImageEntity Image { get; set; }
        public List<CommentEntity> Comments { get; set; }
        public List<EstablishmentEntity> Establishments { get; set; }
    }
}
