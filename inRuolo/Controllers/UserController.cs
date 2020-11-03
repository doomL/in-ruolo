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
        // GET: User
        public ActionResult Index()
        {
            //Console.WriteLine(Service.InvokeServiceGetApi("Esami"));
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
        public ActionResult Formazione()
        {
            //string jsonResult=Service.InvokeServiceGetApi("Titoli");

            //var jobject = JsonConvert.DeserializeObject<JObject>(titoli);
            //System.Diagnostics.Debug.WriteLine(jsonResult);
            //JObject json = JObject.Parse(jsonResult);
            string jsonResult = Service.InvokeServiceGetApi("TitoloUtente/all/" + 1);
            System.Diagnostics.Debug.WriteLine(jsonResult);
            return View();
        }
        public ActionResult Titoli()
        {
            return View();
        }
        public ActionResult Complementari()
        {
            return View();
        }


    }
}