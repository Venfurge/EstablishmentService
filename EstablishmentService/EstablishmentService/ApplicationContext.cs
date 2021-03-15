using EstablishmentService.Entities;
using Microsoft.EntityFrameworkCore;

namespace EstablishmentService
{
    public class ApplicationContext : DbContext
    {
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<EstablishmentEntity> Establishments { get; set; }
        public DbSet<MealEntity> Meals { get; set; }
        public DbSet<CommentEntity> Comments { get; set; }
        public DbSet<ImageEntity> Images { get; set; }

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
