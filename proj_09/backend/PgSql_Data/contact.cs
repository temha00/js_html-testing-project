using System.ComponentModel.DataAnnotations;
namespace PgSql_Data;

public class contact
{
    [Key]
    public int pk_id { get; set; }
    public string? first_name { get; set; }
    public string? last_name { get; set; }
    public string? phone { get; set; }
    public string? address { get; set; }
    public int? gender_id { get; set; }
    // public decimal? income { get; set; }
}

public class company
{
    [Key]
    public int pk_id { get; set; }
    public string? company_name { get; set; }
}