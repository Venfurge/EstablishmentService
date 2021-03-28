using EstablishmentService.Models.File;

namespace EstablishmentService.Models.Meal
{
    public class MealModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public int Weight { get; set; }
        public ImageModel Preview { get; set; }
    }
}
