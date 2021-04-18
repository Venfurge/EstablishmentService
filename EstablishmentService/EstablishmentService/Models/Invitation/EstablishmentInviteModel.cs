using System;

namespace EstablishmentService.Models.Invitation
{
    public class EstablishmentInviteModel
    {
        public DateTime ExpiredDate { get; set; }
        public int EstablishmentId { get; set; }
    }
}
