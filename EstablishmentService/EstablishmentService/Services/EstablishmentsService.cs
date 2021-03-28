using EstablishmentService.Entities;
using EstablishmentService.Exceptions;
using EstablishmentService.Mappers;
using EstablishmentService.Models.Establishment;
using EstablishmentService.Models.User;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstablishmentService.Services
{
    public class EstablishmentsService
    {
        #region Private Members

        private ApplicationContext _db;
        private FileService _fileService;

        #endregion

        #region Constructors

        public EstablishmentsService(ApplicationContext db, FileService fileService)
            => (_db, _fileService) = (db, fileService);

        #endregion

        #region EstablishmentService implementation

        public async Task<List<EstablishmentModel>> GetEstablishments(int id)
        {
            //Get establishments
            var establishments = _db.Establishments
                .Include(v => v.Preview)
                .Where(v => v.OwnerId == id);

            //Mapping objects
            var result = await establishments?.
                Select(v => EstablishmentMapper.Map(v))
                .ToListAsync();

            return result;
        }

        public async Task<EstablishmentModel> EditEstablishment(int id, EditEstablishmentRequest model)
        {
            //Get Establishment
            var establishment = await _db.Establishments
                .Include(v => v.Preview)
                .FirstOrDefaultAsync(v => v.Id == id);

            //Check null
            if (establishment == null)
                throw new NotFoundException("Establishment");

            //If there are any changes
            if (establishment.Name != model.Name || establishment.Description != model.Description)
            {
                //Edit user
                establishment.Name = model.Name;
                establishment.Description = model.Description;

                //update on DB
                _db.Establishments.Update(establishment);
                await _db.SaveChangesAsync();
            }

            //Return
            return EstablishmentMapper.Map(establishment);
        }

        public async Task<EstablishmentModel> EditEstablishmentImage(int id, EditImageRequest imageModel)
        {
            //Get Establishment
            var establishment = await _db.Establishments
                .Include(v => v.Preview)
                .FirstOrDefaultAsync(v => v.Id == id);

            //Check null
            if (establishment == null)
                throw new NotFoundException("Establishment");

            //Upload it
            var name = await _fileService.UploadFile(imageModel.Image);

            //Delete Image if exist
            if (establishment.Preview != null)
            {
                await _fileService.DeleteFile(establishment.Preview.Name);
                _db.Images.Remove(establishment.Preview);
            }

            //Change entity
            var link = $"/files/{name}";
            establishment.Preview = new ImageEntity
            {
                Name = name,
                Link = link,
            };

            //update on DB
            _db.Establishments.Update(establishment);
            await _db.SaveChangesAsync();

            //Return
            return EstablishmentMapper.Map(establishment);
        }

        public async Task<EstablishmentModel> DeleteEstablishmentImage(int id)
        {
            //Get entity
            var entity = await _db.Establishments
                .Include(v => v.Preview)
                .FirstOrDefaultAsync(v => v.Id == id);

            //Check if exist
            if (entity == null)
                throw new NotFoundException("Establishment");

            if (entity.Preview != null)
            {
                //Remove file from server
                await _fileService.DeleteFile(entity.Preview.Name);

                //Remove file from db
                _db.Images.Remove(entity.Preview);
                await _db.SaveChangesAsync();
            }

            //Get model for response
            var establishment = EstablishmentMapper.Map(entity);

            //Return establishment
            return establishment;
        }

        #endregion
    }
}

