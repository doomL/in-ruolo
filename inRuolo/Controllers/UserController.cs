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
            return View();
        }
        

    }
}