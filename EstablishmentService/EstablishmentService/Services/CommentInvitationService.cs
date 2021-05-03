using EstablishmentService.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using EstablishmentService.Exceptions;
using EstablishmentService.Models.Comment;
using Newtonsoft.Json;
using EstablishmentService.Models.Meal;
using EstablishmentService.Mappers;

namespace EstablishmentService.Services
{
    public class CommentInvitationService
    {
        #region Private Members

        private ApplicationContext _db;

        #endregion

        #region Constructors

        public CommentInvitationService(ApplicationContext db)
            => (_db) = (db);

        #endregion

        #region CommentInvitationService Implementation

        public async Task<SingleFieldModel<string>> CreateCommentInvite(List<int> ids)
        {
            var mealIds = await _db.Meals
                .Where(meal => ids.Contains(meal.Id))
                .Select(meal => meal.Id)
                .ToListAsync();

            //Check if exist
            if (mealIds == null || mealIds.Count == 0)
                throw new NotFoundException("Meals");

            //Create Invitation model
            var invite = new CommentInviteModel()
            {
                ExpiredDate = DateTime.Now.AddMinutes(2),
                MealIds = mealIds,
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

        public async Task<List<MealModel>> AcceptCommentInvite(string invitationToken)
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
                var inviteModel = JsonConvert.DeserializeObject<CommentInviteModel>(jsonString);

                //Check if converted
                if (inviteModel == null)
                    throw new BadRequestException("Bad Token");

                //Check if expired
                if (inviteModel.ExpiredDate < DateTime.Now)
                    throw new BadRequestException("Token time expired");

                var meals = await _db.Meals
                    .Include(v => v.Preview)
                    .Where(meal => inviteModel.MealIds.Contains(meal.Id))
                    .ToListAsync();

                //Check if exist
                if (meals == null || meals.Count == 0)
                    throw new NotFoundException("Meals");

                return meals.Select(meal => MealMapper.Map(meal)).ToList();
            }
            catch
            {
                throw new BadRequestException("Bad Request");
            }
        }

        #endregion
    }
}
