using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace db_lib;

public class artikel
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public int pk_iartnr { get; set; }
    public string artikel_nr { get; set; }
    public string herstnr { get; set; }
    public string art_bez1 { get; set; }
    public string art_bez2 { get; set; }
    public string art_bez3 { get; set; }
    public int? fk_warengrup_pk_id { get; set; }
    public int? fk_hersteller_id { get; set; }
    public string erst_user { get; set; }
    public DateTime? erst_dat { get; set; }
    public string edit_user { get; set; }
    public DateTime? edit_dat { get; set; }
}
