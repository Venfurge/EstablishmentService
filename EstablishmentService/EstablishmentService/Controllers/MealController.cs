using EstablishmentService.Models;
using EstablishmentService.Models.Meal;
using EstablishmentService.Models.User;
using EstablishmentService.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using static EstablishmentService.Helpers.Roles;

namespace EstablishmentService.Controllers
{
    [ApiController]
    [Authorize(Roles = Owner)]
    [Route("api/meals")]
    public class MealController : AppControllerBase
    {
        #region Private Members

        private MealService _mealService;

        #endregion

        #region Constructors

        public MealController(MealService mealSerivce)
            => (_mealService) = (mealSerivce);

        #endregion

        #region API Calls

        /// <summary>
        /// Get Meals by Establishment Id
        /// </summary>
        /// <param name="id">Establishment Id</param>
        /// <param name="pn">Page number</param>
        /// <param name="ps">Page size</param>
        /// <param name="sort">Sort by column (id, name, description, price, weight)</param>
        /// <param name="sortDir">Sort direction (asc, desc)</param>
        /// <param name="find">Filter by id, name, description, price, weight</param>
        /// <response code="200">Meals list</response>
        /// <response code="404">Establishment not found</response>
        [HttpGet]
        [Route("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<PagingList<MealModel>>> GetMeals
        (
            int id,
            [FromQuery] int pn = 0,
            [FromQuery] int ps = 10,
            [FromQuery] string sort = "id",
            [FromQuery] string sortDir = "asc",
            [FromQuery] string find = null
        )
        {
            ValidatePaging(ref pn, ref ps);
            return await ExecuteWithOkResponse(async () => await _mealService.GetMeals(id, pn, ps, sort, sortDir, find));
        }

        /// <summary>
        /// Add Meal
        /// </summary>
        /// <param name="id">Establishment Id</param>
        /// <param name="model">Add Meal Model</param>
        /// <response code="200">Id</response>
        /// <response code="400">Bad Model</response>
        /// <response code="404">Meal not found</response>
        [HttpPost]
        [Route("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<MealModel>> AddMeal(int id, [FromBody] EditMealRequest model)
        {
            return await ExecuteWithOkResponse(async () => await _mealService.AddMeal(id, model));
        }

        /// <summary>
        /// Edit Meal
        /// </summary>
        /// <param name="id">Meal Id</param>
        /// <param name="model">Add Meal Model</param>
        /// <response code="200">Meal</response>
        /// <response code="400">Bad Model</response>
        /// <response code="404">Meal not found</response>
        [HttpPut]
        [Route("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<MealModel>> EditProduct(int id, [FromBody] EditMealRequest model)
        {
            return await ExecuteWithOkResponse(async () => await _mealService.EditMeal(id, model));
        }

        /// <summary>
        /// Edit Meal Image by id
        /// </summary>
        /// <response code="200">Meal model</response>
        /// <response code="400">Bad Model</response>
        /// <response code="404">Meal or Meal Image not found</response>
        [HttpPut]
        [Route("{id:int}/edit-image")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<MealModel>> EditMealImage(int id, [FromForm] EditImageRequest model)
        {
            return await ExecuteWithOkResponse(async () => await _mealService.EditMealImage(id, model));
        }

        /// <summary>
        /// Delete meal preview image
        /// </summary>
        /// <response code="200">Meal model</response>
        /// <response code="400">Bad Model</response>
        /// <response code="404">Meal not found</response>
        [HttpPut]
        [Route("{id:int}/delete-image")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<MealModel>> DeleteMealImage(int id)
        {
            return await ExecuteWithOkResponse(async () => await _mealService.DeleteMealImage(id));
        }

        /// <summary>
        /// Delete Meal
        /// </summary>
        /// <param name="id">Meal Id</param>
        /// <response code="200">Deleted</response>
        [HttpDelete]
        [Route("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> DeleteMeal(int id)
        {
            return await ExecuteWithOkResponse(async () => await _mealService.DeleteMeal(id));
        }
        #endregion
    }
}
