using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace inRuolo.Models
{
    public class Nota
    {
        public int Id;
        public ClasseConcorso Classe;
        public string Nome;
        public string Assegnazioni;
        public string Condizioni;
        public string Descrizione;
        public Titolo[] Titoli;
    }
}