namespace EstablishmentService.Models.Invitation
{
    public class InviteAcceptModel
    {
        public bool isAccepted { get; set; }
        public string Token { get; set; }

        public InviteAcceptModel(bool isAccepted, string Token)
            => (this.isAccepted, this.Token) = (isAccepted, Token);
    }
}
