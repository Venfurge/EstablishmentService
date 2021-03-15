using EstablishmentService.Models.User;
using EstablishmentService.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace EstablishmentService.Controllers
{
    [ApiController]
    [Route("api/register")]
    public class RegisterController : AppControllerBase
    {
        #region Private Members

        private UserService _userService;

        #endregion

        #region Constructors

        public RegisterController(UserService userService)
            => (_userService) = (userService);
        

        #endregion

        #region API Calls

        /// <summary>
        /// Add User
        /// </summary>
        /// <param name="model">Add User Model</param>
        /// <response code="200">Id</response>
        /// <response code="400">Bad Model or Login is already used</response>
        [HttpPost]
        [Route("")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserModel>> Register([FromBody] AddUserModel model)
        {
            return await ExecuteWithOkResponse(async () => await _userService.AddUserWithUserRole(model));
        }

        #endregion
    }
}
