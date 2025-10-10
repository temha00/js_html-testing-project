using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MKS.GoliathNet.Common.DataWeb.WEBDATA
{
    public class vertraege_pos
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int pk_id { get; set; }
        public int? fk_kopf_id { get; set; }
        public string artikel_nr { get; set; }
        public string art_bez1 { get; set; }
        public string art_bez2 { get; set; }
        public bool? show_in_techniker { get; set; }
        public int? pos_art { get; set; }
        public int? pos_nr { get; set; }
        public string cpos_nr { get; set; }
        public bool? pauschale_gekundigt { get; set; }
        public decimal? net_stkprs { get; set; }
        public bool? pauschale_voraus { get; set; }
        public DateTime? pauschale_letzte_abrech { get; set; }
        public int? pauschale_intervall { get; set; }
        public int? fk_iartnr { get; set; }
        public DateTime? konti_letzte_abrech { get; set; }
        public DateTime? konti_gekundigt_zum { get; set; }
        public DateTime? pauschale_gekundigt_zum { get; set; }
        public DateTime? pauschale_naechste_abrech { get; set; }
        public DateTime? pauschale_beginnt { get; set; }
        public DateTime? konti_naechste_abrech { get; set; }
        public DateTime? konti_beginnt { get; set; }
        public decimal? kontigent { get; set; }
        public bool? use_kontingent { get; set; }
        public int? konti_intervall { get; set; }
        public int? fk_artikelklassifizierung { get; set; }
        public decimal? net_gesamt { get; set; }
        public decimal? menge { get; set; }
        public decimal? orginalpreis { get; set; }
        public string erst_user { get; set; }
        public DateTime? erst_dat { get; set; }
        public string edit_user { get; set; }
        public DateTime? edit_dat { get; set; }
    }

}
