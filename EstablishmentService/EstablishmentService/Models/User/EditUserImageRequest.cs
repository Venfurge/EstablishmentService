using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace EstablishmentService.Models.User
{
    public class EditUserImageRequest
    {
        [Required]
        public IFormFile Image { get; set; }
    }
}
