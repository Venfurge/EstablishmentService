using EstablishmentService.Entities;
using EstablishmentService.Exceptions;
using EstablishmentService.Mappers;
using EstablishmentService.Models.Comment;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstablishmentService.Services
{
    public class CommentService
    {
        #region Private Members

        private ApplicationContext _db;

        #endregion

        #region Constructors

        public CommentService(ApplicationContext db)
            => (_db) = (db);

        #endregion

        #region CommentService Implementation

        public async Task<List<MealCommentModel>> GetMealComments(int mealId)
        {
            var commentEntities = _db.Comments.Where(comment => comment.MealId == mealId)
                .Include(v => v.User)
                .ThenInclude(v => v.Image)
                .AsNoTracking();

            return await commentEntities.Select(comment => 
                new MealCommentModel()
                { 
                    Text = comment.Text, 
                    User = UserMapper.Map(comment.User)
                }).ToListAsync();
        }

        public async Task AddComments(List<AddMealCommentModelRequest> comments, int userId)
        {
            var userComments = await _db.Comments.Where(comment => comment.UserId == userId)
                .ToListAsync();

            var commentEntities = comments.Select(comment => new CommentEntity()
            {
                Date = DateTime.Now,
                Text = comment.Comment,
                MealId = comment.MealId,
                UserId = userId,
            });

            if(userComments.Count > 0)
            {
                commentEntities = commentEntities.Where(entity => userComments.All(comment => comment.MealId != entity.MealId));

                if (commentEntities.Count() == 0)
                {
                    throw new BadRequestException("All meals has already commented");
                }
            }


            await _db.Comments.AddRangeAsync(commentEntities);
            await _db.SaveChangesAsync();
        }

        #endregion
    }
}
