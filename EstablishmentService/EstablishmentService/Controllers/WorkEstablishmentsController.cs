using EstablishmentService.Models.Establishment;
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
    [Authorize(Roles = WorkerOrAbove)]
    [Route("api/work-establishments")]
    public class WorkEstablishmentsController : AppControllerBase
    {
        #region Private Members

        private WorkEstablishmentsService _workEstablishmentsService;

        #endregion

        #region Constructors

        public WorkEstablishmentsController(WorkEstablishmentsService workEstablishmentsService)
            => (_workEstablishmentsService) = (workEstablishmentsService);

        #endregion

        #region API Calls

        /// <summary>
        /// Get work establishments by token
        /// </summary>
        /// <response code="200">Work Establishments list</response>
        [HttpGet]
        [Route("")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<EstablishmentModel>>> GetEstablishments()
        {
            return await ExecuteWithOkResponse(async () => await _workEstablishmentsService.GetWorkEstablishments(GetUserId()));
        }

        #endregion
    }
}

