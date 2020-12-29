using inRuolo.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
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
            System.Diagnostics.Debug.WriteLine("lenght"+classi.ClassiAcquisite.Length);
            ViewData["ClassiDiConcorsoAcquisite"] = classi.ClassiAcquisite;
            ViewData["ClassiDiConcorsoAcquisibili"] = classi.ClassiAcquisibili;
            ViewData["Titoli"] = JsonConvert.DeserializeObject<TitoloUtente[]>(Service.InvokeServiceGetApi("TitoloUtente/all/" + utenteLoggato.Id));
            ViewData["Complementari"] = JsonConvert.DeserializeObject<Complementare[]>(Service.InvokeServiceGetApi("Complementare/all/" + utenteLoggato.Id));
            return View();
        }
        public ActionResult Lavoro()
        {
            return View();
        }
        public ActionResult Punteggio()
        {
            return View();
        }
        public ActionResult ClassiDiConcorso()
        {
            return View();
        }
    }
}