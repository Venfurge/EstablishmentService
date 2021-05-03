using EstablishmentService.Models.User;

namespace EstablishmentService.Models.Comment
{
    public class MealCommentModel
    {
        public string Text { get; set; }
        public UserModel User { get; set; }
    }
}
