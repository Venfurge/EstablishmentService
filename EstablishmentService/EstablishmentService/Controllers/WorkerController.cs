using EstablishmentService.Models;
using EstablishmentService.Models.Invitation;
using EstablishmentService.Models.User;
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
    [Route("api/worker")]
    public class WorkerController : AppControllerBase
    {
        #region Private Members

        private EstablishmentInvitationService _establishmentInvitationService;
        private EstablishmentWorkerService _establishmentWorkerService;

        #endregion

        #region Constructors

        public WorkerController(
            EstablishmentInvitationService establishmentInvitationService, 
            EstablishmentWorkerService establishmentWorkerService) 
            => (_establishmentInvitationService, _establishmentWorkerService) 
            = (establishmentInvitationService, establishmentWorkerService);

        #endregion

        #region API Calls


        /// <summary>
        /// Get workers by establishmentId
        /// </summary>
        /// <response code="200">Workers list</response>
        /// <response code="404">Workers not found</response>
        [HttpGet]
        [Route("{id:int}")]
        [Authorize(Roles = Owner)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<UserModel>>> GetWorkers
        (
            int id,
            [FromQuery] string find = null
        )
        {
            return await ExecuteWithOkResponse(async () => await _establishmentWorkerService.GetWorkers(id, find));
        }

        /// <summary>
        /// Delete me from worker list of establishment
        /// </summary>
        /// <response code="200">Correct</response>
        /// <response code="404">Establishment not found</response>
        [HttpDelete]
        [Route("{id:int}/delete-worker")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<WorkerRemovedModel>> DeleteWorker(int id)
        {
            return await ExecuteWithOkResponse(async () => await _establishmentWorkerService
                .DeleteWorker(GetUserId(), id));
        }


        /// <summary>
        /// Delete worker from worker list by Owner
        /// </summary>
        /// <response code="200">Correct</response>
        /// <response code="400">Bad Request</response>
        /// <response code="404">Establishment not found</response>
        [HttpDelete]
        [Route("{establishmentId:int}/{workerId:int}/delete-worker")]
        [Authorize(Roles = Owner)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteWorkerByOwner(int workerId, int establishmentId)
        {
            return await ExecuteWithOkResponse(async () => await _establishmentWorkerService
                .DeleteWorkerByOwner(workerId, establishmentId, GetUserId()));
        }

        /// <summary>
        /// Get invite token for establishment
        /// </summary>
        /// <response code="200">Invite token</response>
        /// <response code="404">Establishment not found</response>
        [HttpGet]
        [Route("invite/{id:int}")]
        [Authorize(Roles = Owner)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<SingleFieldModel<string>>> GetInvite(int id)
        {
            return await ExecuteWithOkResponse(async () => await _establishmentInvitationService
                .CreateInvitation(id));
        }

        /// <summary>
        /// Accept invite
        /// </summary>
        /// <response code="200">Invite token</response>
        /// <response code="400">Bad Token, Token time expired</response>
        /// <response code="404">Establishment not found</response>
        [HttpPost]
        [Route("invite")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<InviteAcceptModel>> AcceptInvite([FromQuery] string token)
        {
            return await ExecuteWithOkResponse(async () => await _establishmentInvitationService
                .AcceptInvitation(token, GetUserId()));
        }

        #endregion
    }
}
