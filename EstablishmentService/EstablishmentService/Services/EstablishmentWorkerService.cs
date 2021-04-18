using EstablishmentService.Exceptions;
using EstablishmentService.Mappers;
using EstablishmentService.Models.Invitation;
using EstablishmentService.Models.User;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstablishmentService.Services
{
    public class EstablishmentWorkerService
    {
        #region Private Members

        private ApplicationContext _db;
        private TokenService _tokenService;

        #endregion

        #region Constructors

        public EstablishmentWorkerService(ApplicationContext db, TokenService tokenService)
            => (_db, _tokenService) = (db, tokenService);

        #endregion

        #region EstablishmentInvitationService Implementation

        public async Task<List<UserModel>> GetWorkers(int establishmentId, string find = null)
        {
            var query = _db.EstablishmentUserEntities
                .Include(v => v.User)
                    .ThenInclude(v => v.Image)
                .Where(v => v.EstablishmentId == establishmentId)
                .AsNoTracking();

            //Add filters
            if (!string.IsNullOrEmpty(find))
                query = query.Where(v =>
                    EF.Functions.Like(v.User.FirstName, $"%{find}%") ||
                    EF.Functions.Like(v.User.SecondName, $"%{find}%") ||
                    EF.Functions.Like(v.User.Login, $"%{find}%")
                );

            var workers = await query
                .Select(v => UserMapper.Map(v.User))
                .ToListAsync();

            return workers;
        }

        public async Task DeleteWorkerByOwner(int workerId, int establishmentId, int ownerId)
        {
            var establishment = await _db.Establishments
                .FindAsync(establishmentId);

            //Check if exist
            if (establishment == null)
                throw new NotFoundException("Establishment");

            //Check if owner is correct
            if (establishment.OwnerId != ownerId)
                throw new BadRequestException("Owner");

            await DeleteWorker(workerId, establishmentId);
        }

        public async Task<WorkerRemovedModel> DeleteWorker(int workerId, int establishmentId)
        {
            var worker = await _db.EstablishmentUserEntities
                .FirstOrDefaultAsync(v => v.UserId == workerId && v.EstablishmentId == establishmentId);

            //Check if exist
            if (worker != null)
            {
                _db.EstablishmentUserEntities.Remove(worker);
                await _db.SaveChangesAsync();

                return await checkToSetupUserRole(workerId);
            }

            throw new NotFoundException("Worker");
        }

        #endregion

        #region Private Methods

        private async Task<WorkerRemovedModel> checkToSetupUserRole(int workerId)
        {
            var isUserInWork = await _db.EstablishmentUserEntities
                .AnyAsync(v => v.UserId == workerId);

            if (isUserInWork) {
                return new WorkerRemovedModel(false, "");
            }

            var isUserOwner = await _db.Establishments
                .AnyAsync(v => v.OwnerId == workerId);

            if(isUserOwner) {
                return new WorkerRemovedModel(false, "");
            }

            var user = await _db.Users.FindAsync(workerId);
            user.Role = "User";
            
            _db.Users.Update(user);
            await _db.SaveChangesAsync();

            string token = _tokenService.GenerateToken(user);
            return new WorkerRemovedModel(true, token);
        }

        #endregion
    }
}
