using EstablishmentService.Models;
using EstablishmentService.Models.Meal;
using EstablishmentService.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using static EstablishmentService.Helpers.Roles;

namespace EstablishmentService.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/comment/invite")]
    public class CommentInvitationController : AppControllerBase
    {
        #region Private Members

        private CommentInvitationService _commentInvitationService;

        #endregion

        #region Constructors

        public CommentInvitationController(CommentInvitationService commentInvitationService)
            => (_commentInvitationService) = (commentInvitationService);

        #endregion

        #region API Calls

        /// <summary>
        /// Create invite token for comment
        /// </summary>
        /// <response code="200">Invite token</response>
        /// <response code="404">Meals not found</response>
        [HttpPost]
        [Route("")]
        [Authorize(Roles = WorkerOrAbove)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<SingleFieldModel<string>>> CreateCommentInvite([FromBody] List<int> ids)
        {
            return await ExecuteWithOkResponse(async () => await _commentInvitationService
                .CreateCommentInvite(ids));
        }

        /// <summary>
        /// Accept comment invite
        /// </summary>
        /// <response code="200">List of Meal Models</response>
        /// <response code="400">Bad Token, Token time expired</response>
        /// <response code="404">Meals not found</response>
        [HttpGet]
        [Route("accept")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<MealModel>>> AcceptCommentInvite([FromQuery] string token)
        {
            return await ExecuteWithOkResponse(async () => await _commentInvitationService
                .AcceptCommentInvite(token));
        }

        #endregion
    }
}
