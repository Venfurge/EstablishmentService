using System.Collections.Generic;

namespace EstablishmentService.Entities
{
    public class MealEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public int Weight { get; set; }
        public ImageEntity Preview { get; set; }

        public List<CommentEntity> Comments { get; set; }

        public int EstablishmentId { get; set; }
        public EstablishmentEntity Establishment { get; set; }
    }
}
