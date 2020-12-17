using CommonNSSLib;
using inRuolo.Models;
using Newtonsoft.Json;
using System;
using System.Web.Mvc;
using System.Web.Security;

namespace inRuolo.Controllers
{
    public class Credenziali
    {
        public string username;
        public string password;
    }
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            //Log.Write("Debug","--------------------Login Page------------------");
            Log.Write("Debug", "login", Logger.GetUserIP());
            return View();
        }
        public ActionResult SignIn()
        {
            string userEmail = Request["email"];
            string userPass = Request["password"];
            Credenziali cred = new Credenziali();
            cred.username = userEmail;
            cred.password = null;
            string loggedUser = Service.InvokeServicePostApi("User/login", cred);
            User loggato = JsonConvert.DeserializeObject<User>(loggedUser);
            Log.Write("Debug",loggato.Nome);
            bool response=false;
            Log.Write("Debug",loggedUser);
            if (loggedUser != "")
            {
                response = true;
                Session["user"] = loggato;
                Session["loggato"] = true;
                FormsAuthentication.SetAuthCookie(loggato.Email, true);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            else
            {
                Log.Write("Debug","errore");
                return Json(response, JsonRequestBehavior.AllowGet);

            }
            }
        public ActionResult SignUp()
        {
            User utente = new User();
            utente.Email = Request["email"];
            utente.Password = Request["password"];
            utente.Cognome = Request["cognome"];
            utente.Nome = Request["nome"];
            //var json = Newtonsoft.Json.JsonConvert.SerializeObject(utente);
            String output=Service.InvokeServicePostApi("User/registrazione", utente);
            Log.Write("Debug",output);
            bool response = true;
            return Json(response, JsonRequestBehavior.AllowGet);
        }
    }

}