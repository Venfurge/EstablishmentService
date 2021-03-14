using EstablishmentService.Exceptions;
using EstablishmentService.Mappers;
using EstablishmentService.Models.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace EstablishmentService.Services
{
    public class AuthService
    {
        #region Private Members

        private ApplicationContext _db;
        private TokenService _tokenService;

        #endregion

        #region Constructors

        public AuthService(ApplicationContext db, TokenService tokenService)
            => (_db, _tokenService) = (db, tokenService);

        #endregion

        #region IAuthService implementation

        public async Task<LoginResponse> Login(LoginRequest model)
        {
            //Get user
            var user = await _db.Users
                .FirstOrDefaultAsync(v => v.Login == model.Login);

            //Check null
            if (user == null)
                throw new NotFoundException("User");

            //Check password
            var hasher = new PasswordHasher<string>();
            var passwordCheck = hasher.VerifyHashedPassword(user.Id.ToString(), user.Password, model.Password);

            if (passwordCheck == PasswordVerificationResult.Failed)
                throw new BadRequestException("Incorrect Password");

            //Return
            return new LoginResponse
            {
                Token = _tokenService.GenerateToken(user),
                User = UserMapper.Map(user),
            };
        }

        public async Task<LoginResponse> GetUserToken(int id)
        {
            //Get user
            var user = await _db.Users
                .FindAsync(id);

            //Check null
            if (user == null)
                throw new NotFoundException("User");

            //Return
            return new LoginResponse
            {
                Token = _tokenService.GenerateToken(user),
                User = UserMapper.Map(user),
            };
        }

        #endregion
    }
}
