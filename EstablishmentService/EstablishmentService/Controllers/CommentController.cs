using EstablishmentService.Models.Comment;
using EstablishmentService.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EstablishmentService.Controllers
{
    [ApiController]
    [Route("api/comment")]
    public class CommentController : AppControllerBase
    {
        #region Private Members

        private CommentService _commentService;

        #endregion

        #region Constructors

        public CommentController(CommentService commentService)
            => (_commentService) = (commentService);

        #endregion

        #region API Calls

        /// <summary>
        /// Get comments by meal Id
        /// </summary>
        /// <response code="200">List of Comment Models</response>
        [HttpGet]
        [Route("")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<MealCommentModel>>> GetCommentsByMealId([FromQuery] int mealId)
        {
            return await ExecuteWithOkResponse(async () => await _commentService
                .GetMealComments(mealId));
        }

        /// <summary>
        /// Add comment to meal
        /// </summary>
        /// <response code="200">Correct add</response>
        /// <response code="400">You commented all meals</response>
        [HttpPost]
        [Route("")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> AddComments([FromBody] List<AddMealCommentModelRequest> mealComments)
        {
            return await ExecuteWithOkResponse(async () => await _commentService
                .AddComments(mealComments, GetUserId()));
        }

        #endregion
    }
}
