using System;

namespace EstablishmentService.Entities
{
    public class CommentEntity
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Text { get; set; }

        public int UserId { get; set; }
        public UserEntity User { get; set; }
        public int MealId { get; set; }
        public MealEntity Meal { get; set; }
    }
}
