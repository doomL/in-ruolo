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
        public EsameVO[] Equivalenti;
        public Esame[] Ssd;
    }
}