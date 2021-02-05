namespace inRuolo.Models
{
    public class Corso
    {
        public bool PagamentoCartaDocente;
        public int IdProdotto;
        public bool AcquisisciDocumenti;
        //public inline_model HashDatiEstesi;
        public string Oggetto;
        public string Codice;
        public bool PagamentoOnline;
        public bool UnivocitaAA;
        public double Coupon;
        public string PaginaSeo;
        public double Costo;
        public bool IsMaster;
        public bool VentiquattroCfu;
        public double PuntiMobilita;
        public double PuntiGraduatoria;
        public double PuntiConcorso;
        public string Immagine;
        public string Documento;
        public Fornitore Fornitore;
        public string NomeEsteso;
        public string Nome;
        public string Descrizione;
        public int Id;
        public int NCrediti;
        public int NCreditiEsameFinale;
        public int NCreditiTotale;
        public EsameCorso[] EsamiCorso;
        public string ModuloIscrizione;
        public bool Attivo;
        public int NMaxCreditiFacoltativi;
    }
}