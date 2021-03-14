using EstablishmentService.Models.User;

namespace EstablishmentService.Models.Auth
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public UserModel User { get; set; }
    }
}
