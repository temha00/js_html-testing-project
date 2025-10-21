using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace db_lib;

public class allg_allgemein
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public int pk_id { get; set; }
    public string modul { get; set; }
    public string string1 { get; set; }
    public string string2 { get; set; }
    public string string3 { get; set; }
    public string string4 { get; set; }
    public bool? l1 { get; set; }
    public bool? l2 { get; set; }
    public bool? l3 { get; set; }
    public int? parent_id { get; set; }
    public string erst_user { get; set; }
    public DateTime? erst_dat { get; set; }
    public string edit_user { get; set; }
    public DateTime? edit_dat { get; set; }
}
