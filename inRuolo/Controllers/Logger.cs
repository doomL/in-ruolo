using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace inRuolo.Controllers
{
    public class Logger : Controller
    {

        public static StringBuilder LogString = new StringBuilder();

        public static string GetUserIP()
        {
            return System.Net.Dns.GetHostEntry(System.Net.Dns.GetHostName()).AddressList.GetValue(1).ToString();

        }
        public static void Out(object obj)
        {
            String str = obj.ToString();
            System.Diagnostics.Debug.WriteLine(str);
            LogString.Append("logDate - "+DateTime.Now+" : ").Append("Client Ip ["+GetUserIP() + "] : ").Append(str).Append(Environment.NewLine).Append(Environment.NewLine);
            System.IO.File.WriteAllText(AppDomain.CurrentDomain.BaseDirectory+"/logger/logIR.log", LogString.ToString());
        }
        public ActionResult Index()
        {
            var fileContents = System.IO.File.ReadAllText(Server.MapPath("~/logger/logIR.log"));
            return Content(fileContents);
        }
    }
}