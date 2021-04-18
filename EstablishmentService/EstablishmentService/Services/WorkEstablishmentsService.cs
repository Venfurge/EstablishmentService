using EstablishmentService.Mappers;
using EstablishmentService.Models.Establishment;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstablishmentService.Services
{
    public class WorkEstablishmentsService
    {
        #region Private Members

        private ApplicationContext _db;

        #endregion

        #region Constructors

        public WorkEstablishmentsService(ApplicationContext db)
            => (_db) = (db);

        #endregion

        #region EstablishmentService implementation

        public async Task<List<EstablishmentModel>> GetWorkEstablishments(int id)
        {
            //Get establishments
            var establishments = _db.EstablishmentUserEntities
                .Include(v => v.Establishment)
                    .ThenInclude(v => v.Preview)
                .Where(v => v.UserId == id);

            //Mapping objects
            var result = await establishments?.
                Select(v => EstablishmentMapper.Map(v.Establishment))
                .ToListAsync();

            return result;
        }

        #endregion
    }
}

