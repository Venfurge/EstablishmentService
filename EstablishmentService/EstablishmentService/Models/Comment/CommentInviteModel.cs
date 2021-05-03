using System;
using System.Collections.Generic;

namespace EstablishmentService.Models.Comment
{
    public class CommentInviteModel
    {
        public DateTime ExpiredDate { get; set; }
        public List<int> MealIds { get; set; }
    }
}
