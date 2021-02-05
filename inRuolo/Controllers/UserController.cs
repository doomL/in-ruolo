using CommonNSSLib;
using inRuolo.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace inRuolo.Controllers
{
    public class UserController : Controller
    {
        Logger log = new Logger();
        // GET: User
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Fatturazione()
        {

            return View();
        }
        public ActionResult CambiaPassword()
        {
            return View();
        }
        public ActionResult Titoli()
        {
            String output = Service.InvokeServiceGetApi("SSD/area/all/");
            List<AreaEsame> aree = JsonConvert.DeserializeObject<List<AreaEsame>>(output);
            Session["Aree"] = aree;
            return View();
        }
        public ActionResult Complementari()
        {
            String output = Service.InvokeServiceGetApi("SSD/area/all/");
            List<AreaEsame> aree = JsonConvert.DeserializeObject<List<AreaEsame>>(output);
            Session["Aree"] = aree;
            return View();
        }
        public ActionResult Quesiti()
        {
            return View();
        }
      
        public ActionResult UpdateUtente()
        {
            RequestBody rb = new RequestBody();
            string message = rb.GetDocumentContents(Request);
            Log.Write("Debug", Request["nome"]);
            User ut = (User)Session["user"];
            ut.Nome = Request["nome"];
            ut.Cognome = Request["cognome"];
            ut.Email = Request["email"];
            ut.Citta = Request["citta"];
            ut.Cellulare = Request["cellulare"];
            ut.DataNascita = Request["data"];
            ut.Sesso = Request["sesso"];
            Session["user"] = ut;
            Service.InvokeServicePostApi("User/update/", ut);
            bool response = true;
            return Json(response, JsonRequestBehavior.AllowGet);
        }
        public string GetEquivalenti()
        {
            System.Diagnostics.Debug.WriteLine("iddddddddddddddddd" + Request["idSsd"]);
            String output = Service.InvokeServiceGetApi("SSD/vo/" + Request["idSsd"]);
            SsdVo esame = JsonConvert.DeserializeObject<SsdVo>(output);
            SsdVo[] equivalenti = esame.Equivalenti;
            return JsonConvert.SerializeObject(equivalenti);
        }
     
    }
}