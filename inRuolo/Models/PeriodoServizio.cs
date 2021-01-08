using System;

namespace inRuolo.Models
{
    public class PeriodoServizio
    {
        public int Id;
        public DateTime DataInizio;
        public DateTime DataFine;
        public string CodiceScuola;
        public bool Statale;
        public bool Privata;
        public bool Paritaria;
        public bool Infanzia;
        public bool Primaria;
        public bool PrimoGrado;
        public bool SecondoGrado;
        public int IdClasseConcorso;
        public double PuntiServizioSpecifico;
        public double PuntiServizioAspecifico;
        public string Classe;
        public string Scuola;
        public string TipologiaScuola;
    }
}