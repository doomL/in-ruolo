namespace inRuolo.Models
{
    public class EsameUtente
    {
        public int IdEsame;
        public bool Vo;
        public int IdTitolo;
        public int IdFormazione;
        public int Cfu;
        public int IdSsd;
        public string NomeEsame;

        public override bool Equals(object obj)
        {
            return base.Equals(obj);
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        public override string ToString()
        {
            return base.ToString();
        }
    }

    //public EsameUtente[] ConvertToEsameUtente(SsdVo[] sV)
    //{
    //    EsameUtente[] esami = new EsameUtente[sV.Length];
    //    for (int i=0;i<sV.Length;i++)
    //    {
    //        esami[i].
    //    }
    //}
}