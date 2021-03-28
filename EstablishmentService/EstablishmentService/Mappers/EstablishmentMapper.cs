using EstablishmentService.Entities;
using EstablishmentService.Models.Establishment;

namespace EstablishmentService.Mappers
{
    public static class EstablishmentMapper
    {
        public static EstablishmentEntity Map(EstablishmentModel model)
        {
            if (model == null)
                return null;

            return new EstablishmentEntity()
            {
                Id = model.Id,
                Name = model.Name,
                Description = model.Description,
                Preview = ImageMapper.Map(model.Preview),
            };
        }

        public static EstablishmentModel Map(EstablishmentEntity entity)
        {
            if (entity == null)
                return null;

            return new EstablishmentModel()
            {
                Id = entity.Id,
                Name = entity.Name,
                Description = entity.Description,
                Preview = ImageMapper.Map(entity.Preview),
            };
        }
    }
}
