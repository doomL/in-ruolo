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
            String output = Service.InvokeServiceGetApi("Esami/area/all/");
            List<AreaEsame> aree = JsonConvert.DeserializeObject<List<AreaEsame>>(output);
            Session["Aree"] = aree;
            return View();
        }
        public ActionResult TitoliSelect()
        {
            return View();
        }
        public ActionResult Complementari()
        {
            return View();
        }
        public string GetTitoli()
        {
            User utenteLoggato = (User)Session["user"];
            string jsonResult = Service.InvokeServiceGetApi("TitoloUtente/all/" + utenteLoggato.Id);
            System.Diagnostics.Debug.WriteLine(jsonResult);
            return jsonResult;
        }
        public string GetComplementari()
        {
            User utenteLoggato = (User)Session["user"];
            string jsonResult = Service.InvokeServiceGetApi("Complementare/all/" + utenteLoggato.Id);
            System.Diagnostics.Debug.WriteLine(jsonResult);
            return jsonResult;
        }
        public ActionResult PutTitolo()
        {

            TitoloUtente titoloUtente = new TitoloUtente();
            Titolo titolo = new Titolo();
            Categoria categoria = new Categoria();
            categoria.Id = Int32.Parse(Request["idCategoria"]);
            categoria.Nome = Request["nomeCategoria"];
            categoria.Tipo = "ALL";
            titolo.Id = Int32.Parse(Request["titolo"]);
            titolo.Categoria = categoria;
            titolo.Descrizione = Request["nomeTitolo"];
            titolo.Codice = null;
            titoloUtente.Titolo = titolo;
            titoloUtente.Nome = Request["nomeTitolo"];
            titoloUtente.Categoria = Request["nomeCategoria"];
            titoloUtente.Data = Request["data"];
            titoloUtente.Luogo = Request["luogo"];
            titoloUtente.Voto = Request["voto"];
            titoloUtente.Lode = Convert.ToBoolean(Request["lode"]);
            User utenteLoggato = (User)Session["user"];
            //var json = Newtonsoft.Json.JsonConvert.SerializeObject(utente);

            System.Diagnostics.Debug.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(titoloUtente));
            System.Diagnostics.Debug.WriteLine(Service.InvokeServicePostApi("TitoloUtente/upsert/" + utenteLoggato.Id, titoloUtente));
            bool response = true;
            return Json(response, JsonRequestBehavior.AllowGet);
            //return null;
        }

        public ActionResult PutComplementare()
        {
            Complementare complementare = new Complementare();
            complementare.Tipo = Int32.Parse(Request["tipo"]);
            complementare.Nome = Request["nome"];
            complementare.Data = Request["data"];
            complementare.Luogo = Request["luogo"];
            complementare.Livello = Request["livello"];
            complementare.Ente = Request["ente"];
            complementare.StrTipo = Request["strTipo"];
            User utenteLoggato = (User)Session["user"];
            string output = Service.InvokeServicePostApi("complementare/upsert/" + utenteLoggato.Id, complementare);
            System.Diagnostics.Debug.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(complementare));
            bool response = true;
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        public string GetTitoliCategoria()
        {
            string id = Request["idCategoria"];
            String output = Service.InvokeServiceGetApi("TitoliPerCategoria/" + id);
            return output;
        }
        public string GetEnumTitoli()
        {
            String output = Service.InvokeServiceGetApi("Categorie/");
            return output;
        }
        public string GetAree()
        {
            String output = Service.InvokeServiceGetApi("Esami/area/all/");
            return output;
        }
        public string GetEnumComplementare()
        {
            String output = Service.InvokeServiceGetApi("Complementare/enumerati");
            return output;
        }
        public string GetEsamiUtente()
        {
            User utenteLoggato = (User)Session["user"];
            String output = Service.InvokeServiceGetApi("EsamiPerUtente/all/" + utenteLoggato.Id);
            List<EsameUtente> esamiUtente = JsonConvert.DeserializeObject<List<EsameUtente>>(output);
            List<EsameJson> esamiJson = new List<EsameJson>();
            Esame esame = new Esame();
            EsameJson esameTmp;
            for (int i = 0; i < esamiUtente.Count; i++)
            {
                if (esamiUtente[i].IdTitolo == Int32.Parse(Request["idTitolo"])/* || esamiUtente[i].IdFormazione == Int32.Parse(Request["idFormazione"])*/)
                {
                    esameTmp = new EsameJson();

                    //System.Diagnostics.Debug.WriteLine(esamiUtente[i].IdEsame);
                    esame = JsonConvert.DeserializeObject<Esame>(Service.InvokeServiceGetApi("Esami/" + esamiUtente[i].IdEsame));
                    esameTmp.Id = esame.Id;
                    esameTmp.Descrizione = esame.Descrizione;
                    esameTmp.Cfu = esamiUtente[i].Cfu;
                    esameTmp.AreaEsame = esame.AreaEsame;
                    esameTmp.Codice = esame.Codice;
                    esameTmp.IdTitolo = esamiUtente[i].IdTitolo;
                    esameTmp.IdFormazione = esamiUtente[i].IdFormazione;
                    esamiJson.Add(esameTmp);

                }
            }
            string jsonOutput = JsonConvert.SerializeObject(esamiJson);
            //System.Diagnostics.Debug.WriteLine(jsonOutput);
            return jsonOutput;
        }
        public string GetEsamiUtenteJson()
        {
            User utenteLoggato = (User)Session["user"];
            String EsamiUtenteJson = Service.InvokeServiceGetApi("EsamiPerUtente/all/" + utenteLoggato.Id);
            List<EsameUtente> esamiUtente = JsonConvert.DeserializeObject<List<EsameUtente>>(EsamiUtenteJson);
            List<EsameTab> esamiTab = new List<EsameTab>();
            List<Esame> esami = JsonConvert.DeserializeObject<List<Esame>>(Service.InvokeServiceGetApi("Esami/all/"));
            EsameTab esameTmp;
            System.Diagnostics.Debug.WriteLine(JsonConvert.SerializeObject(esamiUtente));
            for (int i = 0; i < esami.Count; i++)
            {
                esameTmp = new EsameTab();
                EsameUtente esU = esamiUtente.Find(x => x.IdEsame == esami[i].Id);
                if (esU != null && esU.IdTitolo == Int32.Parse(Request["idTitolo"])/* || esamiUtente[i].IdFormazione == Int32.Parse(Request["idFormazione"])*/)
                {

                    esameTmp.Id = esami[i].Id;
                    esameTmp.Descrizione = esami[i].Descrizione;
                    esameTmp.Cfu = esU.Cfu;
                    esameTmp.AreaEsame = esami[i].AreaEsame;
                    esameTmp.Codice = esami[i].Codice;
                    esameTmp.Sostenuto = "checked";
                    esamiTab.Add(esameTmp);
                    System.Diagnostics.Debug.WriteLine("IFFFFFFF" + esameTmp.ToString());
                }
                else
                {
                    esameTmp.Id = esami[i].Id;
                    esameTmp.Descrizione = esami[i].Descrizione;
                    esameTmp.AreaEsame = esami[i].AreaEsame;
                    esameTmp.Codice = esami[i].Codice;
                    esameTmp.Sostenuto = "";
                    esamiTab.Add(esameTmp);
                }

            }
            string jsonOutput = JsonConvert.SerializeObject(esamiTab);
            System.Diagnostics.Debug.WriteLine(jsonOutput);
            return jsonOutput;
        }
        public string GetEsamiUtenteTitolo(int idTitolo)
        {
            User utenteLoggato = (User)Session["user"];
            String EsamiUtenteJson = Service.InvokeServiceGetApi("EsamiPerUtente/all/" + utenteLoggato.Id);
            List<EsameUtente> esamiUtente = JsonConvert.DeserializeObject<List<EsameUtente>>(EsamiUtenteJson);
            esamiUtente.RemoveAll(x => x.IdTitolo != idTitolo);
            return JsonConvert.SerializeObject(esamiUtente);
        }
        public String GetEsami()
        {
            String output = Service.InvokeServiceGetApi("Esami/all/");
            return output;
        }

        //public ActionResult DeleteEsame()
        //{
        //    User utenteLoggato = (User)Session["user"];
        //    String esami = Service.InvokeServiceGetApi("EsamiPerUtente/all/" + utenteLoggato.Id);
        //    List<EsameUtente> esamiUtente = JsonConvert.DeserializeObject<List<EsameUtente>>(esami);
        //    EsameUtente esame = new EsameUtente();
        //    for (int i = 0; i < esamiUtente.Count; i++)
        //    {
        //        if (esamiUtente[i].IdEsame == Int32.Parse(Request["id"]))
        //            esame = esamiUtente[i];

        //    }
        //    string output = Service.InvokeServicePostApi("EsamiPerUtente/delete/" + utenteLoggato.Id, esame);
        //    System.Diagnostics.Debug.WriteLine(output);
        //    bool response = true;
        //    return Json(response, JsonRequestBehavior.AllowGet);
        //}
        public string GetEsamiArea()
        {
            System.Diagnostics.Debug.WriteLine(Request["idArea"]);
            String esami = Service.InvokeServiceGetApi("Esami/xarea/" + Request["idArea"]);
            return esami;
        }

        public void deleteEsami(JArray json,String idTitolo)
        {
            User utenteLoggato = (User)Session["user"];
            String esami = GetEsamiUtenteTitolo(int.Parse(idTitolo));
            List<EsameUtente> esamiUtente = JsonConvert.DeserializeObject<List<EsameUtente>>(esami);
            for (int i = 0; i < json.Count; i++)
            {
                esamiUtente.RemoveAll(x => x.IdEsame == int.Parse(json[i]["id"].ToString())&&x.IdTitolo==int.Parse(idTitolo));

            }
            System.Diagnostics.Debug.WriteLine(esamiUtente.Count());
            foreach(EsameUtente esame in esamiUtente)
            {
                Service.InvokeServicePostApi("EsamiPerUtente/delete/" + utenteLoggato.Id, esame);
            }
        }
        public ActionResult PutEsami()
        {
            User utenteLoggato = (User)Session["user"];
            String idTitolo = Request["idTitolo"];
            String esami = Request["esami"];
            System.Diagnostics.Debug.WriteLine("wcadwa" + esami);
            JArray json = JArray.Parse(esami);
            for (int i = 0; i < json.Count; i++)
            {
                EsameUtente esame = new EsameUtente();
                esame.IdEsame = Int32.Parse(json[i]["id"].ToString());
                esame.Cfu = Int32.Parse(json[i]["cfu"].ToString());
                esame.IdTitolo = Int32.Parse(idTitolo);
                Service.InvokeServicePostApi("EsamiPerUtente/upsert/" + utenteLoggato.Id, esame);
            }
            deleteEsami(json,idTitolo);
            bool response = true;
            return Json(response, JsonRequestBehavior.AllowGet);
        }
    }
}