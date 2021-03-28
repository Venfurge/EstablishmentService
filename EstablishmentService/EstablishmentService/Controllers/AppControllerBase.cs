using EstablishmentService.Exceptions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace EstablishmentService.Controllers
{
    public class AppControllerBase : ControllerBase
    {
        protected async Task<ActionResult<T>> ExecuteWithOkResponse<T>(Func<Task<T>> func)
        {
            try
            {
                return Ok(await func());
            }
            catch (NotFoundException e)
            {
                return NotFound(e.ToString());
            }
            catch (BadRequestException e)
            {
                return BadRequest(e.ToString());
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        protected async Task<ActionResult> ExecuteWithOkResponse(Func<Task> func)
        {
            try
            {
                await func();
                return Ok();
            }
            catch (NotFoundException e)
            {
                return NotFound(e.ToString());
            }
            catch (BadRequestException e)
            {
                return BadRequest(e.ToString());
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        protected int GetUserId()
        {
            try
            {
                var idClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                return Convert.ToInt32(idClaim.Value);
            }
            catch (Exception)
            {
                return 0;
            }
        }
        protected void ValidatePaging(ref int pn, ref int ps)
        {
            if (pn < 0)
                pn = 0;

            if (ps < 1)
                ps = 1;
        }
    }
}
