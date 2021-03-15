using System.Collections.Generic;

namespace EstablishmentService.Models
{
    public class PagingList<T>
    {
        public int TotalCount { get; set; }
        public List<T> Items { get; set; }
    }
}
