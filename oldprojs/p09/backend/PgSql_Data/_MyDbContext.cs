using Microsoft.EntityFrameworkCore;

namespace PgSql_Data;

public class MyDbContext : DbContext
{
    public string connstr { get; }

    public MyDbContext(string connstr)
    {
        this.connstr = connstr;
    }

    //model options/configuration
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // optionsBuilder.UseNpgsql(this.connstr);
        optionsBuilder.UseSqlServer(this.connstr);
    }

    //model contructor
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<contact>().ToTable(nameof(contact));
        modelBuilder.Entity<company>().ToTable(nameof(company));

        base.OnModelCreating(modelBuilder);
    }

    // public override int SaveChanges()
    // {
    //     throw new InvalidOperationException("Read-only context");
    // }


    public DbSet<contact> contacts { get; set; }
    public DbSet<company> companies { get; set; }
}

