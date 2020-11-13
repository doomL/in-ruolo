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
            IsAttivo=true;
            IsAdmin=false;
            IdRivenditore=-1;
            IsRivenditore=false;
            Origin=null;
            DatiFatturazione=null;
            Confermato=false;
            Attivo=true;
            Email=null;
            Sesso="M";
            Citta=null;
            Cognome=null;
            Nome=null;
            //Id=null;
            Formazione=null;
            CodiceFiscale=null;
            ComuneNascita=null;
            ProvNascita=null;
            DataNascita=null;
            ComuneResidenza=null;
            ProvResidenza=null;
            Cap=null;
            IndirizzoResidenza=null;
            Telefono=null;
            Cellulare=null;
            PuntoVendita=false;
            Password=null;
        }
        public void Print()
        {
            System.Diagnostics.Debug.WriteLine(Email + Password + Nome + Cognome);
        }
    }
    public class DatiFatturazione
    {
        public string Sdi;
        public string Pec;
        public string Email;
        public string CodiceFiscale;
        public string Prov;
        public string Citta;
        public string Cap;
        public string Indirizzo;
        public string Cognome;
        public string Nome;
        public string IdUtente;
    }
    public class FormazioneUtente
    {
        public Complementare[] Complementari;
        public int IdUtente;
        public TitoloUtente[] Titoli;
        public ClasseConcorso[] ClassiConcorso;


    }
    public class Complementare
    {
        public int Tipo;
        public string Nome;
        public string Data;
        public string Luogo;
        public string Livello;
        public string Ente;
        public string StrTipo;
    }
    public class TitoloUtente
    {
        public Titolo Titolo;
        public string Nome;
        public string Data;
        public string Voto;
        public string Luogo;
        public string Categoria;
        public bool Lode;
    }
    public class ClasseConcorso
    {
        public bool SecondoGrado;
        public bool PrimoGrado;
        public bool Primaria;
        public bool Infanzia;
        public string NomeEX;
        public string Nome;
        public int Id;
        public string Descrizione;
    }
    public class Titolo
    {
        public Categoria Categoria;
        public string Descrizione;
        public int Id;
        public string Codice;
    }
    public class Categoria
    {
        public int Id;
        public string Nome;
        public string Tipo;
    }
    public class EsameUtente
    {
        public int IdEsame;
        public bool Vo;
        public int IdTitolo;
        public int IdFormazione;
        public int Cfu;
    }
    public class Esame
    {
        public int Id;
        public string Codice;
        public string Descrizione;
        public AreaEsame AreaEsame;
    }
    public class EsameJson
    {
        public int Id;
        public string Codice;
        public string Descrizione;
        public AreaEsame AreaEsame;
        public int IdTitolo;
        public int IdFormazione;
        public bool Vo;
        public int Cfu;
    }
    public class EsameTab
    {
        public int Id;
        public string Codice;
        public string Descrizione;
        public AreaEsame AreaEsame;
        public bool Vo;
        public string Sostenuto;
        public int Cfu;
    }
    public class AreaEsame
    {
        public int Id;
        public string Codice;
        public string Descrizione;
    }

}