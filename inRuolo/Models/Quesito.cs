using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace inRuolo.Models
{
    public class Quesito
    {
        public int Id;
        public int IdUtente;
        public string Key;
        public bool Value;
        public int IdNota;
        public int IdClasse;
        public string TestoQuesito;

        public override bool Equals(object obj)
        {
            return obj is Quesito quesito &&
                   Id == quesito.Id &&
                   Key == quesito.Key &&
                   IdNota == quesito.IdNota &&
                   IdClasse == quesito.IdClasse;
        }

        public override int GetHashCode()
        {
            int hashCode = 1428854531;
            hashCode = hashCode * -1521134295 + Id.GetHashCode();
            hashCode = hashCode * -1521134295 + EqualityComparer<string>.Default.GetHashCode(Key);
            hashCode = hashCode * -1521134295 + IdNota.GetHashCode();
            hashCode = hashCode * -1521134295 + IdClasse.GetHashCode();
            return hashCode;
        }
    }

}