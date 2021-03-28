using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace EstablishmentService.Models.Establishment
{
    public class EditEstablishmentRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
