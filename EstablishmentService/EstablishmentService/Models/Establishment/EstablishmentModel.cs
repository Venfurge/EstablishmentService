using EstablishmentService.Models.File;

namespace EstablishmentService.Models.Establishment
{
    public class EstablishmentModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ImageModel Preview { get; set; }
    }
}
