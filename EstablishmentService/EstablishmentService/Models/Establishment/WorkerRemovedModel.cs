namespace EstablishmentService.Models.Invitation
{
    public class WorkerRemovedModel
    {
        public bool isChanged { get; set; }
        public string Token { get; set; }

        public WorkerRemovedModel(bool isChanged, string Token)
            => (this.isChanged, this.Token) = (isChanged, Token);
    }
}
