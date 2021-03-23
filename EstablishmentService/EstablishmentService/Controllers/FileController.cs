using EstablishmentService.Exceptions;
using EstablishmentService.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace EstablishmentService.Controllers
{
    [ApiController]
    [Route("files")]
    public class FileController : AppControllerBase
    {
        #region Private Members

        private FileService _fileService;

        #endregion

        #region Constructor

        public FileController(FileService fileService)
            => (_fileService) = (fileService);


        #endregion

        #region API Calls

        /// <summary>
        /// Get Image by name
        /// </summary>
        /// <param name="fileName">file name</param>
        /// <response code="200">Image</response>
        /// <response code="404">Image not found</response>
        [HttpGet]
        [Route("{fileName}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetImage(string fileName)
        {
            try
            {
                var image = await _fileService.GetImage(fileName);

                return File(image.bytes, image.type);
            }
            catch (NotFoundException)
            {
                return NotFound("Image not found");
            }
        }

        #endregion
    }
}
