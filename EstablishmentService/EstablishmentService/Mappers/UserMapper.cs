using EstablishmentService.Entities;
using EstablishmentService.Models.User;

namespace EstablishmentService.Mappers
{
    public static class UserMapper
    {
        public static UserEntity Map(UserModel model)
        {
            return new UserEntity()
            {
                Id = model.Id,
                Login = model.Login,
                Role = model.Role,
                FirstName = model.FirstName,
                SecondName = model.SecondName,
                Image = ImageMapper.Map(model.Image),
            };
        }

        public static UserModel Map(UserEntity entity)
        {
            return new UserModel()
            {
                Id = entity.Id,
                Login = entity.Login,
                Role = entity.Role,
                FirstName = entity.FirstName,
                SecondName = entity.SecondName,
                Image = ImageMapper.Map(entity.Image),
            };
        }
    }
}
