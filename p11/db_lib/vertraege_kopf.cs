using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MKS.GoliathNet.Common.DataWeb.WEBDATA
{
    public class vertraege_kopf
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int pk_kopf_id { get; set; }
        public int? kopf_typ { get; set; }
        public string vorgangs_nr { get; set; }
        public string vorgangs_hinweis { get; set; }
        public int? fk_vertrag_proj { get; set; }
        public int? fk_contact { get; set; }
        public bool? ende { get; set; }
        public DateTime? vt_start_dat { get; set; }
        public DateTime? vt_ende_dat { get; set; }
        public int? kopf_sub_typ { get; set; }
        public int? konti_intervall { get; set; }
        public int? konti_ntag { get; set; }
        public int? konti_nmonat { get; set; }
        public int? konti_njahr { get; set; }
        public int? pauschale_intervall { get; set; }
        public int? pauschale_ntag { get; set; }
        public int? pauschale_nmonat { get; set; }
        public int? pauschale_njahr { get; set; }
        public DateTime? pauschale_letzte_abrech { get; set; }
        public DateTime? konti_letzte_abrech { get; set; }
        public string erst_user { get; set; }
        public DateTime? erst_dat { get; set; }
        public string edit_user { get; set; }
        public DateTime? edit_dat { get; set; }
    }

}
