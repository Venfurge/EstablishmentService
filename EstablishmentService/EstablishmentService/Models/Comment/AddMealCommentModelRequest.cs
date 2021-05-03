namespace EstablishmentService.Models.Comment
{
    public class AddMealCommentModelRequest
    {
        public string Comment { get; set; }
        public int MealId { get; set; }
    }
}
