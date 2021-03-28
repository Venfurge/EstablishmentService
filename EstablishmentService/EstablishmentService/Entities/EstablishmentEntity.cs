using System.Collections.Generic;

namespace EstablishmentService.Entities
{
    public class EstablishmentEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ImageEntity Preview { get; set; }
        public List<MealEntity> Meals { get; set; }

        public int OwnerId { get; set; }
        public virtual UserEntity Owner { get; set; }
    }
}
