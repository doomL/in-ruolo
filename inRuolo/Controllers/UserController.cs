﻿using CommonNSSLib;
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
            return View();
        }
        public string GetTitoli()
        {
            User utenteLoggato = (User)Session["user"];
            string jsonResult = Service.InvokeServiceGetApi("TitoloUtente/all/" + utenteLoggato.Id);
            Log.Write("Debug", jsonResult);
            return jsonResult;
        }
        public string GetComplementari()
        {
            User utenteLoggato = (User)Session["user"];
            string jsonResult = Service.InvokeServiceGetApi("Complementare/all/" + utenteLoggato.Id);
            Log.Write("Debug", jsonResult);
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

            Log.Write("Debug", Newtonsoft.Json.JsonConvert.SerializeObject(titoloUtente));
            Log.Write("Debug", Service.InvokeServicePostApi("TitoloUtente/upsert/" + utenteLoggato.Id, titoloUtente));
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
            Log.Write("Debug", Newtonsoft.Json.JsonConvert.SerializeObject(complementare));
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
            String output = Service.InvokeServiceGetApi("SSD/area/all/");
            return output;
        }
        public string GetEnumComplementare()
        {
            String output = Service.InvokeServiceGetApi("Complementare/enumerati");
            return output;
        }
        public string GetSsdUtente()
        {
            User utenteLoggato = (User)Session["user"];
            Parametri parametri = new Parametri()
            {
                IdUtente = utenteLoggato.Id,
                IdTitolo = Int32.Parse(Request["idTitolo"]),
                IdFormazione = -1,
                IdSsd = -1,
                Vo = false
            };

            String output = Service.InvokeServicePostApi("EsamiPerUtente/parametri", parametri);
            List<SsdUtente> ssdUtente = JsonConvert.DeserializeObject<List<SsdUtente>>(output);
            List<Ssd> esami = JsonConvert.DeserializeObject<List<Ssd>>(Service.InvokeServiceGetApi("SSD/all/"));
            List<EsameTab> esamiTab = new List<EsameTab>();
            EsameTab esameTmp;
            for (int i = 0; i < esami.Count; i++)
            {
                esameTmp = new EsameTab();
                SsdUtente sU = ssdUtente.Find(x => x.Ssd.Id == esami[i].Id);
                if (sU != null)
                {
                    esameTmp.Id = esami[i].Id;
                    esameTmp.Descrizione = esami[i].Descrizione;
                    esameTmp.Cfu = sU.Cfu;
                    esameTmp.AreaEsame = esami[i].AreaEsame;
                    esameTmp.Codice = esami[i].Codice;
                    esameTmp.Sostenuto = "checked";
                    esameTmp.EsamiUtente = sU.Esami;
                    esamiTab.Add(esameTmp);
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
            System.Diagnostics.Debug.WriteLine("parametri " + output);
            return JsonConvert.SerializeObject(esamiTab);

        }

        public string GetEsamiUtenteJsonVo()
        {

            User utenteLoggato = (User)Session["user"];
            Parametri parametri = new Parametri()
            {
                IdUtente = utenteLoggato.Id,
                IdTitolo = Int32.Parse(Request["idTitolo"]),
                IdFormazione = -1,
                IdSsd = -1,
                Vo = true

            };

            String output = Service.InvokeServicePostApi("EsamiPerUtente/parametri", parametri);
            List<SsdUtente> ssdUtente = JsonConvert.DeserializeObject<List<SsdUtente>>(output);
            System.Diagnostics.Debug.WriteLine(JsonConvert.SerializeObject(ssdUtente));
            List<EsameTab> esamiTab = new List<EsameTab>();
            List<SsdVo> esamiVO = JsonConvert.DeserializeObject<List<SsdVo>>(Service.InvokeServiceGetApi("SSD/vo/all/"));
            EsameTab esameTmp;
            System.Diagnostics.Debug.WriteLine(JsonConvert.SerializeObject(esamiVO));
            for (int i = 0; i < esamiVO.Count; i++)
            {
                System.Diagnostics.Debug.WriteLine(i);
                esameTmp = new EsameTab();
                SsdUtente sU = ssdUtente.Find(x => x.Ssd.Id == esamiVO[i].Id);
                if (sU != null)
                {
                    esameTmp.Id = esamiVO[i].Id;
                    esameTmp.Descrizione = esamiVO[i].Nome;
                    esameTmp.Cfu = sU.Cfu;
                    esameTmp.Sostenuto = "checked";
                    esameTmp.EsamiUtente = sU.Esami;
                    esameTmp.Equivalenti = esamiVO[i].Equivalenti;
                    for(int j = 0; j < sU.Esami.Length; j++)
                    {
                        SsdVo equi = new SsdVo()
                        {
                            IdPadre = sU.Esami[j].IdSsd,
                            Nome = sU.Esami[j].NomeEsame,
                            Id = sU.Esami[j].IdEsame

                        };
                        esameTmp.Equivalenti.Append(equi);
                    }
                    esameTmp.Vo = true;
                    esamiTab.Add(esameTmp);
                }
                else
                {
                    esameTmp.Id = esamiVO[i].Id;
                    esameTmp.Descrizione = esamiVO[i].Nome;
                    esameTmp.Sostenuto = "";
                    esameTmp.Equivalenti = esamiVO[i].Equivalenti;
                    esameTmp.Vo = true;
                    esamiTab.Add(esameTmp);
                }

            }
            string jsonOutput = JsonConvert.SerializeObject(esamiTab);
            //Logger.Out(jsonOutput);
            return jsonOutput;
        }
        public string GetEsamiUtente()
        {
            User utenteLoggato = (User)Session["user"];
            Parametri parametri = new Parametri()
            {
                IdUtente = utenteLoggato.Id,
                IdTitolo = Int32.Parse(Request["idTitolo"]),
                IdFormazione = -1,
                IdSsd = Int32.Parse(Request["idSsd"])
            };
            String output = Service.InvokeServicePostApi("EsamiPerUtente/parametri", parametri);
            System.Diagnostics.Debug.WriteLine(output);
            if (output == "[]")
                return null;
            SsdUtente[] ssdUtente = JsonConvert.DeserializeObject<SsdUtente[]>(output);
            return JsonConvert.SerializeObject(ssdUtente[0].Esami);

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
            String output = Service.InvokeServiceGetApi("SSD/all/");
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
        //    Log.Write("Debug",output);
        //    bool response = true;
        //    return Json(response, JsonRequestBehavior.AllowGet);
        //}
        //public string GetEsamiArea()
        //{
        //    Log.Write("Debug", Request["idArea"]);
        //    String esami = Service.InvokeServiceGetApi("SSD/xarea/" + Request["idArea"]);
        //    return esami;
        //}

        public ActionResult DeleteEsami()
        {
            User utenteLoggato = (User)Session["user"];
            EsameUtente esame = new EsameUtente()
            {
                IdEsame = Int32.Parse(Request["idEsame"])
            };
            String output = Service.InvokeServicePostApi("EsamiPerUtente/delete/" + utenteLoggato.Id, esame);
            System.Diagnostics.Debug.WriteLine(output);
            bool response = true;
            return Json(response, JsonRequestBehavior.AllowGet);

        }
        public ActionResult DeleteEsamiVo()
        {
            User utenteLoggato = (User)Session["user"];
            EsameUtente esame = new EsameUtente()
            {
                IdEsame = Int32.Parse(Request["idEsame"])
            };
            String output = Service.InvokeServicePostApi("EsamiPerUtente/delete/" + utenteLoggato.Id, esame);
            System.Diagnostics.Debug.WriteLine(output);
            bool response = true;
            return Json(response, JsonRequestBehavior.AllowGet);

        }
        public ActionResult PutEsami()
        {
            User utenteLoggato = (User)Session["user"];
            String idTitolo = Request["idTitolo"];
            String idSsd = Request["idSsd"];
            String esami = Request["esami"];
            JArray json = JArray.Parse(esami);
            for (int i = 0; i < json.Count; i++)
            {
                EsameUtente esame = new EsameUtente
                {
                    Cfu = Int32.Parse(json[i]["cfu"].ToString()),
                    IdTitolo = Int32.Parse(idTitolo),
                    IdSsd = Int32.Parse(idSsd),
                    NomeEsame = json[i]["name"].ToString(),
                    Vo = false
                };
                Service.InvokeServicePostApi("EsamiPerUtente/upsert/" + utenteLoggato.Id, esame);
            }
            bool response = true;
            return Json(response, JsonRequestBehavior.AllowGet);
        }
        public ActionResult PutEsamiVo()
        {
            User utenteLoggato = (User)Session["user"];
            String idTitolo = Request["idTitolo"];
            String idSsd = Request["idSsd"];
            string cfu = Request["cfu"];
            string name = Request["name"];
            System.Diagnostics.Debug.WriteLine(idTitolo + " " + idSsd + " " + cfu + " " + name);
            // SsdVo ssdVo = JsonConvert.DeserializeObject<SsdVo>(Service.InvokeServiceGetApi("SSD/vo/" + idEsame));
            EsameUtente esame = new EsameUtente
            {
                Cfu = Int32.Parse(cfu),
                IdTitolo = Int32.Parse(idTitolo),
                IdSsd = Int32.Parse(idSsd),
                NomeEsame = name,//ssdVo.Nome,
                Vo = true
            };
            System.Diagnostics.Debug.WriteLine(Service.InvokeServicePostApi("EsamiPerUtente/upsert/" + utenteLoggato.Id, esame));

            bool response = true;
            return Json(response, JsonRequestBehavior.AllowGet);
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
    }
}