using EstablishmentService.Models.Auth;
using EstablishmentService.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace EstablishmentService.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : AppControllerBase
    {
        #region Private Members

        private AuthService _authService;

        #endregion

        #region Constructors

        public AuthController(AuthService authService)
            => (_authService) = (authService);

        #endregion

        #region API Calls

        /// <summary>
        /// Login
        /// </summary>
        /// <response code="200">Login response</response>
        /// <response code="400">Bad model or incorrect password</response>
        /// <response code="404">User not found</response>
        [HttpPost]
        [Route("")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest model)
        {
            return await ExecuteWithOkResponse(async () => await _authService.Login(model));
        }

        #endregion
    }
}
