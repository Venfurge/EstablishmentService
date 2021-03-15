namespace EstablishmentService.Entities
{
    public class ImageEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Link { get; set; }

        public int UserId { get; set; }
        public UserEntity User { get; set; }

        public int EstablishmentId { get; set; }
        public EstablishmentEntity Establishment { get; set; }

        public int MealId { get; set; }
        public MealEntity Meal { get; set; }
    }
}
