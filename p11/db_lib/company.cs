using System.ComponentModel.DataAnnotations;

namespace db_lib;

public class company
{
    [Key]
    public int pk_id { get; set; }
    public string? company_name { get; set; }
}
