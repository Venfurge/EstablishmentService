using EstablishmentService.Entities;
using EstablishmentService.Models.File;

namespace EstablishmentService.Mappers
{
    public class ImageMapper
    {
        public static ImageEntity Map(ImageModel model)
        {
            if (model == null)
                return null;

            return new ImageEntity()
            {
                Id = model.Id,
                Name = model.Name,
                Link = model.Link,
            };
        }

        public static ImageModel Map(ImageEntity entity)
        {
            if (entity == null)
                return null;

            return new ImageModel()
            {
                Id = entity.Id,
                Name = entity.Name,
                Link = entity.Link,
            };
        }
    }
}
