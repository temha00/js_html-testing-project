using System.ComponentModel.DataAnnotations;
namespace db_lib;

public class contact
{
    [Key]
    public int pk_id { get; set; }
    public string? first_name { get; set; }
    public string? last_name { get; set; }
    public string? phone { get; set; }
    public string? address { get; set; }
    public int? gender_id { get; set; }
    public DateTime? birthdate { get; set; }
    // public decimal? income { get; set; }
}
