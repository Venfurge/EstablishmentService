using EstablishmentService.Entities;
using EstablishmentService.Exceptions;
using EstablishmentService.Mappers;
using EstablishmentService.Models.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace EstablishmentService.Services
{
    public class ProfileService
    {
        #region Private Members

        private ApplicationContext _db;
        private FileService _fileService;

        #endregion

        #region Constructors

        public ProfileService(ApplicationContext db, FileService fileService)
            => (_db, _fileService) = (db, fileService);

        #endregion

        #region IProfileService implementation

        public async Task<UserModel> GetProfile(int id)
        {
            //Get User
            var user = await _db.Users
                .Include(v => v.Image)
                .FirstOrDefaultAsync(v => v.Id == id);

            //Check null
            if (user == null)
                throw new NotFoundException("User");

            //Return User
            return UserMapper.Map(user);
        }

        public async Task<UserModel> EditProfile(int id, EditUserRequest model)
        {
            //Get User
            var user = await _db.Users.FindAsync(id);

            //Check null
            if (user == null)
                throw new NotFoundException("User");

            //Check that login is not used
            var existingUser = await _db.Users
                .FirstOrDefaultAsync(v => EF.Functions.Like(v.Login, model.Login) && v.Id != id);

            if (existingUser != null)
                throw new BadRequestException($"User with login [{model.Login} is already exist]");

            //If there are any changes
            if (user.Login != model.Login || user.FirstName != model.FirstName || user.SecondName != model.SecondName)
            {
                //Edit user
                user.Login = model.Login;
                user.FirstName = model.FirstName;
                user.SecondName = model.SecondName;

                //Save changes
                _db.Users.Update(user);
                await _db.SaveChangesAsync();
            }

            //Return
            return UserMapper.Map(user);
        }

        public async Task<UserModel> EditProfileImage(int id, EditUserImageRequest model)
        {
            //Get entiry
            var entity = await _db.Users
                .Include(v => v.Image)
                .FirstOrDefaultAsync(v => v.Id == id);

            //Check if exist
            if (entity == null)
                throw new NotFoundException("User");

            //Upload it
            var name = await _fileService.UploadFile(model.Image);

            //Crop image
            var newName = await _fileService.CropImage(name, 512, 512);

            //Check if croped
            if (newName == null)
                throw new NotFoundException("Image");

            //Delete Image if exist
            if (entity.Image != null)
            {
                await _fileService.DeleteFile(entity.Image.Name);
                _db.Images.Remove(entity.Image);
            }

            //Change entity
            var link = $"/files/{newName}";
            entity.Image = new ImageEntity
            {
                Name = newName,
                Link = link,
            };

            //update on DB
            _db.Users.Update(entity);
            await _db.SaveChangesAsync();

            //Get model for response
            var user = UserMapper.Map(entity);

            //Return user
            return user;
        }

        public async Task<UserModel> DeleteProfileImage(int id)
        {
            //Get entity
            var entity = await _db.Users
                .Include(v => v.Image)
                .FirstOrDefaultAsync(v => v.Id == id);

            //Check if exist
            if (entity == null)
                throw new NotFoundException("User");

            if (entity.Image != null)
            {
                //Remove file from server
                await _fileService.DeleteFile(entity.Image.Name);

                //Remove file from db
                _db.Images.Remove(entity.Image);
                await _db.SaveChangesAsync();
            }

            //Get model for response
            var user = UserMapper.Map(entity);

            //Return user
            return user;
        }

        public async Task ChangePassword(int id, ChangeUserPasswordRequest model)
        {
            //Get User
            var user = await _db.Users.FindAsync(id);

            //Check null
            if (user == null)
                throw new NotFoundException("User");

            //Create hasher
            var hasher = new PasswordHasher<string>();

            //Check is passwords are similar
            var passwordCheck = hasher.VerifyHashedPassword(user.Id.ToString(), user.Password, model.NewPassword);

            if (passwordCheck == PasswordVerificationResult.Success)
                return;

            //Change password
            user.Password = hasher.HashPassword(user.Id.ToString(), model.NewPassword);

            //Save changes
            _db.Users.Update(user);
            await _db.SaveChangesAsync();
        }
    }

    #endregion
}