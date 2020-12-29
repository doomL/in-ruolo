using System.Collections.Generic;

namespace inRuolo.Models
{
    public class EsameTab
    {
        public int Id;
        public string Codice;
        public string Descrizione;
        public AreaEsame AreaEsame;
        public bool Vo;
        public string Sostenuto;
        public int Cfu;
        public SsdVo[] Equivalenti;
        public List<EquivalenteTab> EquivalenteTabs;
        public EsameUtente[] EsamiUtente;
        public EsameUtente[] EsamiUtenteVo;
    }
    public class EquivalenteTab
    {
        public int Id;
        public string Nome;
        public int IdPadre;
        public string Sostenuto;
        public int Cfu;
    }
}