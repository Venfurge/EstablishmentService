using EstablishmentService.Entities;
using EstablishmentService.Exceptions;
using EstablishmentService.Models;
using EstablishmentService.Models.Invitation;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;

namespace EstablishmentService.Services
{
    public class EstablishmentInvitationService
    {
        #region Private Members

        private ApplicationContext _db;
        private TokenService _tokenService;

        #endregion

        #region Constructors

        public EstablishmentInvitationService(ApplicationContext db, TokenService tokenService)
            => (_db, _tokenService) = (db, tokenService);

        #endregion

        #region EstablishmentInvitationService Implementation

        public async Task<SingleFieldModel<string>> CreateInvitation(int establishmentId)
        {
            var establishment = await _db.Establishments
                .FindAsync(establishmentId);

            //Check if exist
            if (establishment == null)
                throw new NotFoundException("Establishment");

            //Create Invitation model
            var invite = new EstablishmentInviteModel()
            {
                ExpiredDate = DateTime.Now.AddMinutes(2),
                EstablishmentId = establishment.Id,
            };

            //Convert to json string
            string jsonString = JsonConvert.SerializeObject(invite);
            byte[] encryptedText;

            //Encrypt json string to byte[]
            encryptedText = AesAlgorithm.EncryptStringToBytes(jsonString);

            string encryptedTextString = Convert.ToBase64String(encryptedText)
                .TrimEnd('=').Replace('+', '-').Replace('/', '_');

            return new SingleFieldModel<string>(encryptedTextString);
        }

        public async Task<InviteAcceptModel> AcceptInvitation(string invitationToken, int userId)
        {
            //Convert to correct Base64 string;
            string encryptedTextBase64 = invitationToken.Replace('_', '/').Replace('-', '+');
            encryptedTextBase64 += (encryptedTextBase64.Length % 4) switch
            {
                2 => "==",
                3 => "=",
                _ => "",
            };

            try
            {
                //Convert from Base64 to encrypted string
                byte[] encryptedText = Convert.FromBase64String(encryptedTextBase64);

                //Decrypt
                string jsonString = AesAlgorithm.DecryptStringFromBytes(encryptedText);

                //Convert JSON to Model
                var inviteModel = JsonConvert.DeserializeObject<EstablishmentInviteModel>(jsonString);

                //Check if converted
                if (inviteModel == null)
                    throw new BadRequestException("Bad Token");

                //Check if expired
                if (inviteModel.ExpiredDate < DateTime.Now)
                    throw new BadRequestException("Token time expired");

                var establishment = await _db.Establishments
                    .FindAsync(inviteModel.EstablishmentId);

                //Check if exist
                if (establishment == null)
                    throw new NotFoundException("Establishment");

                //Check if user isn't owner
                if (establishment.OwnerId == userId)
                    return new InviteAcceptModel(false, "");

                var worker = await _db.EstablishmentUserEntities
                    .Include(v => v.User)
                    .FirstOrDefaultAsync(v => v.UserId == userId && v.EstablishmentId == establishment.Id);

                string token = "";

                if (worker != null)
                {
                    token = _tokenService.GenerateToken(worker.User);
                    return new InviteAcceptModel(true, token);
                }

                var entity = new EstablishmentUserEntity()
                {
                    UserId = userId,
                    EstablishmentId = establishment.Id,
                };

                await setupWorkerRole(userId);
                var newWorker = await _db.EstablishmentUserEntities.AddAsync(entity);
                await _db.SaveChangesAsync();

                await newWorker.ReloadAsync();

                token = _tokenService.GenerateToken(newWorker.Entity.User);
                return new InviteAcceptModel(true, token);
            }
            catch
            {
                throw new BadRequestException("Bad Request");
            }
        }

        #endregion

        #region Private Methods

        private async Task setupWorkerRole(int userId)
        {
            var user = await _db.Users.FindAsync(userId);

            if (user.Role == "User")
                user.Role = "Worker";

            await _db.SaveChangesAsync();
        }

        #endregion
    }
}
