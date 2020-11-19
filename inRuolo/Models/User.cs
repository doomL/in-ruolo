using inRuolo.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace inRuolo.Models
{
    public class User
    {
        public bool IsAttivo;
        public bool IsAdmin;
        public int IdRivenditore;
        public bool IsRivenditore;
        public string Origin;
        public DatiFatturazione DatiFatturazione;
        public bool Confermato;
        public bool Attivo;
        public string Email { get; set; }
        public string Sesso;
        public string Citta;
        public string Cognome { get; set; }
        public string Nome { get; set; }
        public int Id;
        public FormazioneUtente Formazione;
        public string CodiceFiscale;
        public string ComuneNascita;
        public string ProvNascita;
        public string DataNascita;
        public string ComuneResidenza;
        public string ProvResidenza;
        public string Cap;
        public string IndirizzoResidenza;
        public string Telefono;
        public string Cellulare;
        public bool PuntoVendita;
        public string Password { get; set; }

        public User()
        {
            IsAttivo = true;
            IsAdmin = false;
            IdRivenditore = -1;
            IsRivenditore = false;
            Origin = null;
            DatiFatturazione = null;
            Confermato = false;
            Attivo = true;
            Email = null;
            Sesso = "M";
            Citta = null;
            Cognome = null;
            Nome = null;
            //Id=null;
            Formazione = null;
            CodiceFiscale = null;
            ComuneNascita = null;
            ProvNascita = null;
            DataNascita = null;
            ComuneResidenza = null;
            ProvResidenza = null;
            Cap = null;
            IndirizzoResidenza = null;
            Telefono = null;
            Cellulare = null;
            PuntoVendita = false;
            Password = null;
        }
        public void Print()
        {
            Logger.Out(Email + Password + Nome + Cognome);
        }
    }
}