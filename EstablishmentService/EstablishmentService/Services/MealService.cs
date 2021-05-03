using EstablishmentService.Entities;
using EstablishmentService.Exceptions;
using EstablishmentService.Mappers;
using EstablishmentService.Models;
using EstablishmentService.Models.Meal;
using EstablishmentService.Models.User;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace EstablishmentService.Services
{
    public class MealService
    {
        #region Private Members

        private ApplicationContext _db;
        private FileService _fileService;

        #endregion

        #region Constructors

        public MealService(ApplicationContext db, FileService fileService)
            => (_db, _fileService) = (db, fileService);

        #endregion

        #region EstablishmentService implementation

        public async Task<PagingList<MealModel>> GetMeals(int id, int pn = 0, int ps = 10, string sort = "id", string sortDir = "asc", string find = null)
        {
            //Create response
            var response = new PagingList<MealModel>();

            var query = _db.Meals
                .Include(v => v.Preview)
                .Where(v => v.EstablishmentId == id);

            if (query == null)
                throw new NotFoundException("Meals");

            //Add filters
            if (!string.IsNullOrEmpty(find))
                query = query.Where(v =>
                    EF.Functions.Like(v.Name, $"%{find}%") ||
                    EF.Functions.Like(v.Description, $"%{find}%") ||
                    EF.Functions.Like(v.Price.ToString(), $"%{find}%") ||
                    EF.Functions.Like(v.Weight.ToString(), $"%{find}%") ||
                    EF.Functions.Like(v.Id.ToString(), $"%{find}%")
                );

            //Add order
            query = OrderMeals(query, sort, sortDir);

            //Write total count
            response.TotalCount = await query.CountAsync();

            //Add paging
            query = query
                .Skip(pn * ps)
                .Take(ps);

            //Get items
            response.Items = await query
                .Select(v => MealMapper.Map(v))
                .ToListAsync();

            //Return response
            return response;
        }

        public async Task<MealModel> GetMealById(int mealId)
        {
            var mealEntity = await _db.Meals
                .Include(v => v.Preview)
                .FirstOrDefaultAsync(v => v.Id == mealId);

            if (mealEntity == null)
                throw new NotFoundException("Meal");

            return MealMapper.Map(mealEntity);
        }

        public async Task<MealModel> AddMeal(int establishmentId, EditMealRequest model)
        {
            //Get Establishment
            var establishment = await _db.Establishments
                .AsNoTracking()
                .FirstOrDefaultAsync(v => v.Id == establishmentId);

            //Check null
            if (establishment == null)
                throw new NotFoundException("Establishment");

            //Create entity
            var entity = new MealEntity
            {
                Name = model.Name,
                Description = model.Description,
                Price = model.Price,
                Weight = model.Weight,
                EstablishmentId = establishment.Id,
            };

            //Save entity to DB
            var createdEntity = await _db.Meals.AddAsync(entity);
            await _db.SaveChangesAsync();

            //Reload entity
            await createdEntity.ReloadAsync();

            //Return new entity
            return MealMapper.Map(createdEntity.Entity);
        }

        public async Task<MealModel> EditMeal(int id, EditMealRequest model)
        {
            //Get entity
            var entity = await _db.Meals
                .Include(v => v.Preview)
                .FirstOrDefaultAsync(v => v.Id == id);

            //Check if exist
            if (entity == null)
                throw new NotFoundException("Meal");

            //Update entity
            entity.Name = model.Name;
            entity.Description = model.Description;
            entity.Price = model.Price;
            entity.Weight = model.Weight;

            //Save changes
            _db.Meals.Update(entity);
            await _db.SaveChangesAsync();

            //Return new entity
            return MealMapper.Map(entity);
        }

        public async Task<MealModel> EditMealImage(int id, EditImageRequest imageModel)
        {
            //Get entity
            var entity = await _db.Meals
                .Include(v => v.Preview)
                .FirstOrDefaultAsync(v => v.Id == id);

            //Check null
            if (entity == null)
                throw new NotFoundException("Meal");

            //Upload it
            var name = await _fileService.UploadFile(imageModel.Image);

            //Crop image
            var newName = await _fileService.CropImage(name, 512, 512);

            //Check if croped
            if (newName == null)
                throw new NotFoundException("Image");

            //Delete Image if exist
            if (entity.Preview != null)
            {
                await _fileService.DeleteFile(entity.Preview.Name);
                _db.Images.Remove(entity.Preview);
            }

            //Change entity
            var link = $"/files/{newName}";
            entity.Preview = new ImageEntity
            {
                Name = newName,
                Link = link,
            };

            //update on DB
            _db.Meals.Update(entity);
            await _db.SaveChangesAsync();

            //Return
            return MealMapper.Map(entity);
        }

        public async Task<MealModel> DeleteMealImage(int id)
        {
            //Get entity
            var entity = await _db.Meals
                .Include(v => v.Preview)
                .FirstOrDefaultAsync(v => v.Id == id);

            //Check if exist
            if (entity == null)
                throw new NotFoundException("Meal");

            if (entity.Preview != null)
            {
                //Remove file from server
                await _fileService.DeleteFile(entity.Preview.Name);

                //Remove file from db
                _db.Images.Remove(entity.Preview);
                await _db.SaveChangesAsync();
            }

            //Get model for response
            var meal = MealMapper.Map(entity);

            //Return meal
            return meal;
        }

        public async Task DeleteMeal(int id)
        {
            //Get entity
            var entity = await _db.Meals
                .Include(v => v.Preview)
                .FirstOrDefaultAsync(v => v.Id == id);

            //Check if exist
            if (entity == null)
                return;

            //Check if image exist
            if (entity.Preview != null)
            {

                //Remove files from server
                await _fileService.DeleteFile(entity.Preview.Name);

                //Remove image from DB
                _db.Images.Remove(entity.Preview);
            }

            //Remove and save to DB
            _db.Meals.Remove(entity);
            await _db.SaveChangesAsync();
        }

        #endregion

        #region Private Methods

        private IQueryable<MealEntity> OrderMeals(IQueryable<MealEntity> query, string sort, string sortDir)
            => (sort, sortDir ?? "asc") switch
            {
                ("id", "desc") => query.OrderByDescending(v => v.Id),
                ("id", "asc") => query.OrderBy(v => v.Id),
                ("name", "desc") => query.OrderByDescending(v => v.Name),
                ("name", "asc") => query.OrderBy(v => v.Name),
                ("description", "desc") => query.OrderByDescending(v => v.Description),
                ("description", "asc") => query.OrderBy(v => v.Description),
                ("price", "desc") => query.OrderByDescending(v => v.Price),
                ("price", "asc") => query.OrderBy(v => v.Price),
                ("weight", "desc") => query.OrderByDescending(v => v.Weight),
                ("weight", "asc") => query.OrderBy(v => v.Weight),
                _ => query.OrderBy(v => v.Id)
            };

        #endregion
    }
}
