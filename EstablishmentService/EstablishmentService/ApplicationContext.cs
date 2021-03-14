using EstablishmentService.Entities;
using Microsoft.EntityFrameworkCore;

namespace EstablishmentService
{
    public class ApplicationContext : DbContext
    {
        public DbSet<UserEntity> Users { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.EnsureCreated();
            //Database.EnsureDeleted();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }
}
