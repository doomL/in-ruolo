using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace inRuolo.Models
{
    public class JsonComuni
    {
        public Comune[] Property1 { get; set; }
    }

    public class Comune
    {
        public string nome { get; set; }
        public string codice { get; set; }
        public Zona zona { get; set; }
        public Regione regione { get; set; }
        public Provincia provincia { get; set; }
        public string sigla { get; set; }
        public string codiceCatastale { get; set; }
        public string[] cap { get; set; }
        public int popolazione { get; set; }
    }

    public class Zona
    {
        public string codice { get; set; }
        public string nome { get; set; }
    }

    public class Regione
    {
        public string codice { get; set; }
        public string nome { get; set; }
    }

    public class Provincia
    {
        public string codice { get; set; }
        public string nome { get; set; }
    }
}
