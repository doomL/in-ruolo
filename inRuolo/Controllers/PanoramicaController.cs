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
            List<ClasseNota> classi = JsonConvert.DeserializeObject<List<ClasseNota>>(Service.InvokeServiceGetApi("InRuolo/classi/" + utenteLoggato.Id)).Distinct().ToList();
            HashSet<ClasseConcorso> classiConcorso = new HashSet<ClasseConcorso>();
            foreach (ClasseNota x in classi)
            {
                classiConcorso.Add(x.Classe);
            }
            //ClasseNota[] uniqueClassi = classi.Distinct().ToArray();
            var unique_items = new HashSet<ClasseNota>(classi);
            ViewData["ClassiDiConcorso"] = classiConcorso;
            ViewData["Titoli"] = JsonConvert.DeserializeObject<TitoloUtente[]>(Service.InvokeServiceGetApi("TitoloUtente/all/" + utenteLoggato.Id));
            ViewData["Complementari"] = JsonConvert.DeserializeObject<Complementare[]>(Service.InvokeServiceGetApi("Complementare/all/" + utenteLoggato.Id));
            return View();
        }
    }
}