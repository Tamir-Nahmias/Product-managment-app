using Microsoft.EntityFrameworkCore;
using ProductManagementApp.Model;
namespace ProductManagementApp.Config{

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }

}
}