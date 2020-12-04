namespace inRuolo.Models
{
    public class SsdVo
        {
        public int Id;
        public string Nome;
        public SsdVo[] Equivalenti;
        public Ssd[] Ssd;
        public int IdPadre;

        public static SsdVo ConvertEsame(EsameUtente eU)
        {
            SsdVo vo = new SsdVo()
            {
                Nome = eU.NomeEsame,
                IdPadre = eU.IdSsd,
                Equivalenti=null,
                Id=0,
                Ssd=null
            };
            System.Diagnostics.Debug.WriteLine(vo.Nome);
            return vo;
        }
}
}