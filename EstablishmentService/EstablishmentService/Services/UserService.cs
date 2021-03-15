using EstablishmentService.Entities;
using EstablishmentService.Exceptions;
using EstablishmentService.Helpers;
using EstablishmentService.Mappers;
using EstablishmentService.Models.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace EstablishmentService.Services
{
    public class UserService
    {
        #region Private Members

        ApplicationContext _db;

        #endregion

        #region Constructors

        public UserService(ApplicationContext db)
            => (_db) = (db);

        #endregion

        #region IUserService implementation

        public async Task<UserModel> AddUser(AddUserModel model)
        {
            //Check if user with the same login already exist
            var user = await _db.Users
                .FirstOrDefaultAsync(v => v.Login == model.Login);

            if (user != null)
                throw new BadRequestException($"User with login: {model.Login} is already exist!");

            //Create entity
            var entity = new UserEntity
            {
                Login = model.Login,
                Role = model.Role,
            };

            //Add entity to DB
            var newUser = await _db.Users.AddAsync(entity);
            await _db.SaveChangesAsync();

            //Reload entity and return new entity
            await newUser.ReloadAsync();

            //Create hasher
            var hasher = new PasswordHasher<string>();

            //Save user password
            var newUserEntity = newUser.Entity;
            newUserEntity.Password = hasher.HashPassword(newUserEntity.Id.ToString(), model.Password); //Hash pasword
            _db.Users.Update(newUserEntity);
            await _db.SaveChangesAsync();

            //Return user
            return UserMapper.Map(newUser.Entity);
        }

        //Addes user with only User Role
        public async Task<UserModel> AddUserWithUserRole(AddUserModel model)
        {
            model.Role = Roles.User;
            return await AddUser(model);
        }

        #endregion
    }
}
