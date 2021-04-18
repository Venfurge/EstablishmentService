namespace EstablishmentService.Entities
{
    public class EstablishmentUserEntity
    {
        public int UserId { get; set; }
        public UserEntity User { get; set; }

        public int EstablishmentId { get; set; }
        public EstablishmentEntity Establishment { get; set; }
    }
}
