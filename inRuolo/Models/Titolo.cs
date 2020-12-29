namespace inRuolo.Models
{
    public class Titolo
    {
        public Categoria Categoria;
        public string Descrizione;
        public int Id;
        public string Codice;
    
        public Titolo()
        {
            Categoria = null;
            Descrizione = null;
            Id = 0;
            Codice = null;
        }
        public Titolo(int id)
        {
            Categoria = null;
            Descrizione = null;
            Id = id;
            Codice = null;
        
        }
    }
}