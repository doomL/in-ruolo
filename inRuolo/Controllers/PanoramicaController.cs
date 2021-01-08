using inRuolo.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace inRuolo.Controllers
{
    public class PanoramicaController : Controller
    {
        // GET: Panoramica
        public ActionResult Index()
        {
            User utenteLoggato = (User)Session["user"];
            SituazioneClassiUtente classi = JsonConvert.DeserializeObject<SituazioneClassiUtente>(Service.InvokeServiceGetApi("InRuolo/classi/" + utenteLoggato.Id));
            //HashSet<ClasseConcorso> classiConcorso = new HashSet<ClasseConcorso>();
            //HashSet<SoluzioneClasse> acquisibili = new HashSet<SoluzioneClasse>();
            System.Diagnostics.Debug.WriteLine("lenght" + classi.ClassiAcquisite.Length);
            ViewData["ClassiDiConcorsoAcquisite"] = classi.ClassiAcquisite;
            ViewData["ClassiDiConcorsoAcquisibili"] = classi.ClassiAcquisibili;
            ViewData["Titoli"] = JsonConvert.DeserializeObject<TitoloUtente[]>(Service.InvokeServiceGetApi("TitoloUtente/all/" + utenteLoggato.Id));
            ViewData["Complementari"] = JsonConvert.DeserializeObject<Complementare[]>(Service.InvokeServiceGetApi("Complementare/all/" + utenteLoggato.Id));
            return View();
        }
        public ActionResult Lavoro()
        {
            List<ClasseConcorso> classi = JsonConvert.DeserializeObject<List<ClasseConcorso>>(Service.InvokeServiceGetApi("Classi"));
            ViewData["ClassiDiConcorso"] = classi;

            return View();
        }
        public ActionResult Punteggio()
        {
            List<ClasseConcorso> classi = JsonConvert.DeserializeObject<List<ClasseConcorso>>(Service.InvokeServiceGetApi("Classi"));
            ViewData["ClassiDiConcorso"] = classi;
            return View();
        }
        public ActionResult ClassiDiConcorso()
        {
            List<ClasseConcorso> classi = JsonConvert.DeserializeObject<List<ClasseConcorso>>(Service.InvokeServiceGetApi("Classi"));
            ViewData["ClassiDiConcorso"] = classi;
            return View();
        }
        public string GetScuole()
        {
            ParametriScuole parametri = new ParametriScuole()
            {
                Codice = Request["codice"],
                Nome = Request["nome"],
                Provincia = Request["provincia"],
                Regione = Request["regione"],
                Comune = Request["comune"]
            };
            System.Diagnostics.Debug.WriteLine(Service.InvokeServiceGetApi("Classi"));
            string output = Service.InvokeServicePostApi("Scuole/parametri/", parametri);
            return output;
        }
        //public string GetComuni()
        //{
        //    var path = Path.Combine(Server.MapPath("~/Content/data/comuni.json"));
        //    string s = System.IO.File.ReadAllText(path);
        //    List<Comune> json = JsonConvert.DeserializeObject<List<Comune>>(s);
        //    ViewData["Comuni"] = json;
        //    return s;
        //}
        public ActionResult SalvaPeriodo()
        {
            User utenteLoggato = (User)Session["user"];
            ParametriScuole parametri = new ParametriScuole()
            {
                Codice = Request["codice"],
            };
            ClasseConcorso classe = JsonConvert.DeserializeObject<ClasseConcorso>(Service.InvokeServiceGetApi("Classi/" + Int32.Parse(Request["cdc"])));
            Scuola[] scuola = JsonConvert.DeserializeObject<Scuola[]>(Service.InvokeServicePostApi("Scuole/parametri/", parametri));
            PeriodoServizio periodoServizio = new PeriodoServizio()
            {
                CodiceScuola = Request["codice"],
                IdClasseConcorso = Int32.Parse(Request["cdc"]),
                DataInizio = DateTime.Parse(Request["dateStart"]),
                DataFine = DateTime.Parse(Request["dateEnd"]),
                Infanzia = scuola[0].Infanzia,
                Primaria = scuola[0].Primaria,
                PrimoGrado = scuola[0].PrimoGrado,
                SecondoGrado = scuola[0].SecondoGrado,
                //Statale,
                //Paritaria,
                //Privata,
                TipologiaScuola=scuola[0].Tipologia,
                Scuola=scuola[0].NomeScuola,
                Classe=classe.Nome,
        };
            Service.InvokeServicePostApi("PeriodiServizio/upsert/" + utenteLoggato.Id, periodoServizio);
            bool response = true;
            return Json(response, JsonRequestBehavior.AllowGet);
        }
        public string GetPeriodo()
        {
            User utenteLoggato = (User)Session["user"];
            List<PeriodoServizio> periodi = JsonConvert.DeserializeObject<List<PeriodoServizio>>(Service.InvokeServiceGetApi("PeriodiServizio/all/" + utenteLoggato.Id));
            return JsonConvert.SerializeObject(periodi);
        }
        public ActionResult DeletePeriodo()
        {
            System.Diagnostics.Debug.WriteLine(Request["idPeriodo"]);
            Service.InvokeServicePostApi("PeriodiServizio/delete/"+ Request["idPeriodo"],null);
            bool response = true;
            return Json(response, JsonRequestBehavior.AllowGet);
        }
    }
}
