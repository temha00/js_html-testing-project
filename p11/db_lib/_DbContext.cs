using Microsoft.EntityFrameworkCore;

namespace db_lib;

public class _DbContext : DbContext
{
    public string connstr { get; }

    public _DbContext(string connstr)
    {
        this.connstr = connstr;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(this.connstr);
    }

    public override int SaveChanges()
    {
        throw new InvalidOperationException("Read-only context");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<contact>().ToTable(nameof(contact));
        modelBuilder.Entity<company>().ToTable(nameof(company));
        modelBuilder.Entity<allg_allgemein>().ToTable(nameof(allg_allgemein));
        modelBuilder.Entity<artikel>().ToTable(nameof(artikel));
        modelBuilder.Entity<kontakte>().ToTable(nameof(kontakte));
        modelBuilder.Entity<vertraege_kopf>().ToTable(nameof(vertraege_kopf));
        modelBuilder.Entity<vertraege_pos>().ToTable(nameof(vertraege_pos));

        base.OnModelCreating(modelBuilder);
    }

    public DbSet<contact> contacts { get; set; }
    public DbSet<company> companies { get; set; }
    public DbSet<allg_allgemein> allg_allgemeins { get; set; }
    public DbSet<artikel> artikels { get; set; }
    public DbSet<kontakte> kontaktes { get; set; }
    public DbSet<vertraege_kopf> vertraege_kopfs { get; set; }
    public DbSet<vertraege_pos> vertraege_poss { get; set; }
}
