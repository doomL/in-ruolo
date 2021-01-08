using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace inRuolo.Models
{
    public class PeriodoTab
    {
        public int Id;
        public DateTime DataInizio;
        public DateTime DataFine;
        public string Scuola;
        public double PuntiServizioSpecifico;
        public double PuntiServizioAspecifico;
        public int IdClasseConcorso;
        public string ClasseConcorso;
    }
}