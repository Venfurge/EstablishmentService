using EstablishmentService.Models.User;
using EstablishmentService.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace EstablishmentService.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/profile")]
    public class ProfileController : AppControllerBase
    {

        #region Private Members

        private ProfileService _profileService;

        #endregion

        #region Constructors

        public ProfileController(ProfileService profileService)
            => (_profileService) = (profileService);

        #endregion

        #region API Calls

        /// <summary>
        /// Get profile by token
        /// </summary>
        /// <response code="200">User model</response>
        /// <response code="404">User not found</response>
        [HttpGet]
        [Route("")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<UserModel>> GetProfile()
        {
            return await ExecuteWithOkResponse(async () => await _profileService.GetProfile(GetUserId()));
        }


        /// <summary>
        /// Edit user profile
        /// </summary>
        /// <response code="200">User model</response>
        /// <response code="400">Bad Model or Login is already used</response>
        /// <response code="404">User not found</response>
        [HttpPut]
        [Route("")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<UserModel>> EditUserProfile([FromBody] EditUserRequest model)
        {
            return await ExecuteWithOkResponse(async () => await _profileService.EditProfile(GetUserId(), model));
        }

        /// <summary>
        /// Edit user profile image
        /// </summary>
        /// <response code="200">User model</response>
        /// <response code="400">Bad Model</response>
        /// <response code="404">User or image not found</response>
        [HttpPut]
        [Route("edit-image")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<UserModel>> EditUserProfileImage([FromForm] EditImageRequest model)
        {
            return await ExecuteWithOkResponse(async () => await _profileService.EditProfileImage(GetUserId(), model));
        }

        /// <summary>
        /// Delete user profile image
        /// </summary>
        /// <response code="200">User model</response>
        /// <response code="400">Bad Model</response>
        /// <response code="404">User not found</response>
        [HttpPut]
        [Route("delete-image")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<UserModel>> DeleteUserProfileImage()
        {
            return await ExecuteWithOkResponse(async () => await _profileService.DeleteProfileImage(GetUserId()));
        }

        /// <summary>
        /// Change user password
        /// </summary>
        /// <response code="200">User model</response>
        /// <response code="400">Bad Model</response>
        /// <response code="404">User not found</response>
        [HttpPost]
        [Route("change-password")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> ChangeUserPassword([FromBody] ChangeUserPasswordRequest model)
        {
            return await ExecuteWithOkResponse(async () => await _profileService.ChangePassword(GetUserId(), model));
        }

        #endregion
    }
}
