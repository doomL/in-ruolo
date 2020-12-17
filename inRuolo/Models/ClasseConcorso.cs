using System.Collections.Generic;

namespace inRuolo.Models
{
    public class ClasseConcorso
    {
        public bool SecondoGrado;
        public bool PrimoGrado;
        public bool Primaria;
        public bool Infanzia;
        public string NomeEx;
        public string Nome;
        public int Id;
        public string Descrizione;
        public int PostiConcorso;
        public double Popolarita;

        public override bool Equals(object obj)
        {
            return obj is ClasseConcorso concorso &&
                   SecondoGrado == concorso.SecondoGrado &&
                   PrimoGrado == concorso.PrimoGrado &&
                   Primaria == concorso.Primaria &&
                   Infanzia == concorso.Infanzia &&
                   NomeEx == concorso.NomeEx &&
                   Nome == concorso.Nome &&
                   Id == concorso.Id &&
                   Descrizione == concorso.Descrizione &&
                   PostiConcorso == concorso.PostiConcorso &&
                   Popolarita == concorso.Popolarita;
        }

        public override int GetHashCode()
        {
            int hashCode = 1905220460;
            hashCode = hashCode * -1521134295 + SecondoGrado.GetHashCode();
            hashCode = hashCode * -1521134295 + PrimoGrado.GetHashCode();
            hashCode = hashCode * -1521134295 + Primaria.GetHashCode();
            hashCode = hashCode * -1521134295 + Infanzia.GetHashCode();
            hashCode = hashCode * -1521134295 + EqualityComparer<string>.Default.GetHashCode(NomeEx);
            hashCode = hashCode * -1521134295 + EqualityComparer<string>.Default.GetHashCode(Nome);
            hashCode = hashCode * -1521134295 + Id.GetHashCode();
            hashCode = hashCode * -1521134295 + EqualityComparer<string>.Default.GetHashCode(Descrizione);
            hashCode = hashCode * -1521134295 + PostiConcorso.GetHashCode();
            hashCode = hashCode * -1521134295 + Popolarita.GetHashCode();
            return hashCode;
        }
        public static ClasseConcorso ClasseDefault()
        {
            ClasseConcorso classe = new ClasseConcorso()
            {
                SecondoGrado = true,
                PrimoGrado = false,
                Primaria = false,
                Infanzia = false,
                NomeEx = "(ex A006 D607 D608 D609 D622)",
                Nome = "A-03",
                Id = 3,
                Descrizione = "Design della ceramica",
                PostiConcorso = 6,
                Popolarita = 0.02
            };
            return classe;
        }
    }

}