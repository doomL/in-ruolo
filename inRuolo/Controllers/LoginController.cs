using inRuolo.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

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
            System.Diagnostics.Debug.WriteLine("--------------------Login Page------------------");
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
            System.Diagnostics.Debug.WriteLine(loggato.Nome);
            bool response=false;
            System.Diagnostics.Debug.WriteLine(loggedUser);
            if (loggedUser != "")
            {
                response = true;
                Session["user"] = loggato;
                Session["loggato"] = true;
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            else
            {
                System.Diagnostics.Debug.WriteLine("errore");
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
            System.Diagnostics.Debug.WriteLine(output);
            bool response = true;
            return Json(response, JsonRequestBehavior.AllowGet);
        }
    }

}