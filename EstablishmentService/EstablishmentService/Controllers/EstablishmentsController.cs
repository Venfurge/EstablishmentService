using EstablishmentService.Models.Establishment;
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
    [Authorize(Roles = Owner)]
    [Route("api/establishment")]
    public class EstablishmentsController : AppControllerBase
    {
        #region Private Members

        private EstablishmentsService _establishmentsService;

        #endregion

        #region Constructors

        public EstablishmentsController(EstablishmentsService establishmentsService)
            => (_establishmentsService) = (establishmentsService);

        #endregion

        #region API Calls

        /// <summary>
        /// Get establishments by token
        /// </summary>
        /// <response code="200">Establishments list</response>
        [HttpGet]
        [Route("")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<EstablishmentModel>>> GetEstablishments()
        {
            return await ExecuteWithOkResponse(async () => await _establishmentsService.GetEstablishments(GetUserId()));
        }

        /// <summary>
        /// Edit Establishment by id
        /// </summary>
        /// <response code="200">Establishment model</response>
        /// <response code="400">Bad Model</response>
        /// <response code="404">Establishment not found</response>
        [HttpPut]
        [Route("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<EstablishmentModel>> EditEstablishment(int id, [FromBody] EditEstablishmentRequest model)
        {
            return await ExecuteWithOkResponse(async () => await _establishmentsService.EditEstablishment(id, model));
        }

        /// <summary>
        /// Edit Establishment Image by id
        /// </summary>
        /// <response code="200">Establishment model</response>
        /// <response code="400">Bad Model</response>
        /// <response code="404">Establishment or Establishment Image not found</response>
        [HttpPut]
        [Route("{id:int}/edit-image")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<EstablishmentModel>> EditEstablishmentImage(int id, [FromForm] EditImageRequest model)
        {
            return await ExecuteWithOkResponse(async () => await _establishmentsService.EditEstablishmentImage(id, model));
        }

        /// <summary>
        /// Delete establishment preview image
        /// </summary>
        /// <response code="200">Establishment model</response>
        /// <response code="400">Bad Model</response>
        /// <response code="404">Establishment not found</response>
        [HttpPut]
        [Route("{id:int}/delete-image")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<EstablishmentModel>> DeleteEstablishmentImage(int id)
        {
            return await ExecuteWithOkResponse(async () => await _establishmentsService.DeleteEstablishmentImage(id));
        }

        #endregion
    }
}
