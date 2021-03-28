using EstablishmentService.Entities;
using EstablishmentService.Models.Meal;

namespace EstablishmentService.Mappers
{
    public static class MealMapper
    {
        public static MealEntity Map(MealModel model)
        {
            if (model == null)
                return null;

            return new MealEntity()
            {
                Id = model.Id,
                Name = model.Name,
                Description = model.Description,
                Price = model.Price,
                Weight = model.Weight,
                Preview = ImageMapper.Map(model.Preview),
            };
        }

        public static MealModel Map(MealEntity entity)
        {
            if (entity == null)
                return null;

            return new MealModel()
            {
                Id = entity.Id,
                Name = entity.Name,
                Description = entity.Description,
                Price = entity.Price,
                Weight = entity.Weight,
                Preview = ImageMapper.Map(entity.Preview),
            };
        }
    }
}
