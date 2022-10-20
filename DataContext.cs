using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Paroo.Entities.CartAggregate;
using Paroo.Entities.CategoryAggregate;
using Paroo.Entities.DispatchAggregate;
using Paroo.Entities.MediaAggregate;
using Paroo.Entities.OrderAggregate;
using Paroo.Entities.ProductAggregate;
using Paroo.Entities.StateAggregate;
using Paroo.Entities.UserAggregate;


namespace Paroo
{
    //Add-Migration Entities -Context SqliteDataContext -OutputDir Migrations\SqliteMigrations
    //update-database -Context SqliteDataContext
    public class DataContext : IdentityDbContext
    {
        protected readonly IConfiguration Configuration;

        public DataContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to sql server database
            
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            #region Product
            builder.Entity<Product>()
                .HasMany(c => c.Medias)
                .WithOne(c => c.Product)
                .OnDelete(DeleteBehavior.Cascade);
            
            builder.Entity<Product>()
                .HasMany(c => c.Orders)
                .WithOne(c => c.Product)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Product>()
                .HasMany(c => c.WhishLists)
                .WithOne(c => c.Product)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Product>()
                .HasMany(c => c.ProductViews)
                .WithOne(c => c.Product)
                .OnDelete(DeleteBehavior.Cascade);


            builder.Entity<Product>()
                .HasMany(c => c.ProductReviews)
                .WithOne(c => c.Product)
                .OnDelete(DeleteBehavior.Cascade);
            #endregion

            #region Bundle
            builder.Entity<Bundle>()
                .HasMany(c => c.Products)
                .WithOne(c => c.Bundle)
                .HasForeignKey(x=>x.BundleId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.Entity<Bundle>()
                .HasOne(c => c.Media)
                .WithOne(c => c.Bundle)
                .OnDelete(DeleteBehavior.Cascade);

            #endregion

            #region Profile
            builder.Entity<Profile>()
                .HasMany(c => c.UserLikes)
                .WithOne(c => c.Profile)
                .OnDelete(DeleteBehavior.Cascade);

            #endregion


            #region ProductCategory
            builder.Entity<ProductCategory>()
                .HasKey(sc => new { sc.CategoryId, sc.ProductId });
            #endregion


            #region State
            builder.Entity<State>()
                .HasMany(c => c.Provinces)
                .WithOne(c => c.State)
                .OnDelete(DeleteBehavior.Cascade);
            #endregion

        }

        public DbSet<Profile> profiles { get; set; }
        public DbSet<Product> products { get; set; }
        public DbSet<Media> medias { get; set; }
        public DbSet<ProductView> product_views { get; set; }
        public DbSet<Order> orders { get; set; }
        public DbSet<ProductReview> product_reviews { get; set; }
        public DbSet<Bundle> bundles { get; set; }
        public DbSet<State> states { get; set; }
        public DbSet<Province> provinces { get; set; }
        public DbSet<Category> categories { get; set; }
        public DbSet<ProductCategory> product_categories { get; set; }
        public DbSet<Cart> carts { get; set; }
        public DbSet<UserLike> user_likes { get; set; }
        public DbSet<WhishList> whish_lists { get; set; }
        public DbSet<CategoryPrices> category_prices { get; set; }
        public DbSet<Dispatcher> dispatchers {get;set;}
    }
}
