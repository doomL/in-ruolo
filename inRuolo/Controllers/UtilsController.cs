using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace inRuolo.Controllers
{
    public class UtilsController : Controller
    {
        public static DateTime LoginTime;
        // GET: Utils
        public static Double GetTimeElapsed ()
        {
            return (DateTime.Now - LoginTime).TotalSeconds;
        }
        public static void SetLoginTime()
        {
            LoginTime=DateTime.Now;
            System.Diagnostics.Debug.WriteLine(LoginTime);
        }
        public static string CalculateDays(int gg)
        {
            int Days = gg;
            int months = 0;
            int years = 0;
            string timeStr=null;
            if (Days >= 365)
            {
                years = Days / 365;

                Days = Days % (365);
            }

            if (Days >= 30)
            {
                months = Days / 30;

                Days = Days % 30;
            }

            switch (years)
            {
                case 0:
                    break;
                case 1:
                    timeStr += years.ToString() + " Anno ";
                    break;
                default:
                    timeStr += years.ToString() + " Anni ";
                    break;
            }
            switch (months)
            {
                case 0:
                    break;
                case 1:
                    timeStr += months.ToString() + " Mese ";
                    break;
                default:
                    timeStr += months.ToString() + " Mesi ";
                    break;
            }
            switch (Days)
            {
                case 0:
                    break;
                case 1:
                    timeStr += Days.ToString() + " Giorno ";
                    break;
                default:
                    timeStr += Days.ToString() + " Giorni";
                    break;
            }
            return timeStr;
        }
    }

}