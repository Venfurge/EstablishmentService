using EstablishmentService.Entities;
using EstablishmentService.Models.Auth;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EstablishmentService.Services
{
    public class TokenService
    {
        #region Private Members

        private IConfiguration _configuration;

        #endregion

        #region Constructor

        public TokenService(IConfiguration configuration)
            => (_configuration) = (configuration);

        #endregion

        #region ITokenService implementation

        public string GenerateToken(UserEntity user)
        {
            //Set claims
            var authClaims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role),
            };

            //Get options
            var authOptions = _configuration.GetSection("AuthOptions").Get<AuthOptions>();

            //Create token
            var token = new JwtSecurityToken(
                issuer: authOptions.Issuer,
                audience: authOptions.Audience,
                expires: DateTime.Now.AddMinutes(authOptions.ExpiresInMinutes),
                claims: authClaims,
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authOptions.SecureKey)),
                    SecurityAlgorithms.HmacSha256Signature)
                );

            //Return token string
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        #endregion
    }
}
