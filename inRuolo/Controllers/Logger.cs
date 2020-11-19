using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace inRuolo.Controllers
{
    public class Logger
    {

        public static StringBuilder LogString = new StringBuilder();

        private static string GetUserIP()
        {
            return System.Net.Dns.GetHostEntry(System.Net.Dns.GetHostName()).AddressList.GetValue(1).ToString();

        }
        public static void Out(object obj)
        {
            String str = obj.ToString();
            System.Diagnostics.Debug.WriteLine(str);
            LogString.Append("logDate - "+DateTime.Now+" : ").Append("Client Ip ["+GetUserIP() + "] : ").Append(str).Append(Environment.NewLine).Append(Environment.NewLine);
            File.WriteAllText(AppDomain.CurrentDomain.BaseDirectory+"/logger/logIR.log", LogString.ToString());
        }
    }
}