namespace EstablishmentService.Helpers
{
    public static class Roles
    {
        public const string Owner = "Owner";
        public const string Worker = "Worker";
        public const string User = "User";

        public const string UserOrAbove = "User, Worker, Owner";
        public const string WorkerOrAbove = "Worker, Owner";
    }
}
