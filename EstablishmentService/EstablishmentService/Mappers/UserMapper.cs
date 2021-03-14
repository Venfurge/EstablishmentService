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
            };
        }

        public static UserModel Map(UserEntity entity)
        {
            return new UserModel()
            {
                Id = entity.Id,
                Login = entity.Login,
                Role = entity.Role,
            };
        }
    }
}
