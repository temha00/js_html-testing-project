using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace proj_01_dbContext;

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
        optionsBuilder.UseNpgsql(this.connstr);
    }

    //model contructor
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }

    public override int SaveChanges()
    {
        throw new InvalidOperationException("Read-only context");
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        throw new InvalidOperationException("Read-only context");
    }

    public DbSet<contact_list> contact_Lists { get; set; }
}

public class contact_list
{
    [Key]
    public int pk_id { get; set; }
    public string? contact_id { get; set; }
    public string? first_name { get; set; }
    public string? last_name { get; set; }
    public string? address { get; set; }
    public string? phone { get; set; }
    public string? genderId { get; set; }
}