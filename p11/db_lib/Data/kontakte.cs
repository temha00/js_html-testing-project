using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace db_lib;


public class kontakte
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public int pk_contact { get; set; }
    public string kurzbez { get; set; }
    public string name1 { get; set; }
    public bool? is_kunde { get; set; }
    public bool? is_liefer { get; set; }
    public string name2 { get; set; }
    public string erst_user { get; set; }
    public DateTime? erst_dat { get; set; }
    public string edit_user { get; set; }
    public DateTime? edit_dat { get; set; }
}
