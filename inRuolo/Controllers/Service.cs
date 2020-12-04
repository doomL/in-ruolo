using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;


public class Service
{
    static DateTime dtScadenza = DateTime.MinValue;
    //static string host = "http://localhost:52098";
    static string host = "https://ws.inruolo.it";
    static string token = "";

    private static string GetToken()
    {
        //if (dtScadenza <= DateTime.Now)
        //{
        LoginWs();
        //}
        return token;
    }

    private static void LoginWs()
    {
        var url = host + "/token";
        Console.WriteLine(url);
        var client = new WebClient();
        var method = "POST";
        var parameters = new NameValueCollection();


        parameters.Add("username", "prombola@gmail.com");
        parameters.Add("password", "Zc8EKVSv");
        parameters.Add("grant_type", "password");

        /* Always returns a byte[] array data as a response. */
        var response_data = client.UploadValues(url, method, parameters);

        // Parse the returned data (if any) if needed.
        var responseString = UnicodeEncoding.UTF8.GetString(response_data);

        JObject joResponse = JObject.Parse(responseString);
        string apitoken = (string)joResponse["access_token"];
        int secondiScadenza = Convert.ToInt32(joResponse["expires_in"]);
        dtScadenza = DateTime.Now.AddSeconds(secondiScadenza);
        token = apitoken;

    }
    public static string InvokeServiceGetApi(string service)
    {
        string text = "";
        WebRequest request1 = HttpWebRequest.Create(host + "/api/" + service);
        request1.Headers.Add("Authorization", "Bearer " + GetToken());
        request1.Method = "GET";
        request1.ContentType = "application/json";
        request1.ContentLength = 0;
        var resp = request1.GetResponse();
        using (var sr = new StreamReader(resp.GetResponseStream()))
        {
            text = sr.ReadToEnd();
        }
        Console.WriteLine(host + "/api/" + service);
        return text;

    }
    public static string InvokeServicePostApi(string service, object obj)
    {
        string json = JsonConvert.SerializeObject(obj);
        System.Diagnostics.Debug.WriteLine(json);
        var url = host + "/api/" + service;
        Uri u = new Uri(url);
        HttpContent c = new StringContent(json, Encoding.UTF8, "application/json");
        //c.Headers.Add("Authorization", "Bearer " + GetToken());
        var t = Task.Run(() => PostURI(u, c));
        t.Wait();

        string text = t.Result;
        return text;
    }

    public static bool InvokeServiceDeleteApi(string service)
    {
        bool isDelete = false;
        using (var client = new HttpClient())
        {
            client.BaseAddress = new Uri(host + "/api/");

            //HTTP DELETE
            var deleteTask = client.DeleteAsync(service);
            deleteTask.Wait();

            var result = deleteTask.Result;
            if (result.IsSuccessStatusCode)
            {
                isDelete = true;

            }
        }
        return isDelete;
    }

    async static Task<string> PostURI(Uri u, HttpContent c)
    {
        var response = string.Empty;
        using (var client = new HttpClient())
        {
            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", GetToken());
            HttpResponseMessage result = await client.PostAsync(u, c);
            if (result.IsSuccessStatusCode)
            {
                response = await result.Content.ReadAsStringAsync();
                //return JsonConvert.DeserializeObject<object>(jsonString);
                //response = result.StatusCode.ToString();
                //response = result.Content.ToString();
            }
        }
        return response;
    }

    async static Task<string> PutURI(Uri u, HttpContent c)
    {
        var response = string.Empty;
        using (var client = new HttpClient())
        {
            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", GetToken());
            HttpResponseMessage result = await client.PutAsync(u, c);
            if (result.IsSuccessStatusCode)
            {
                response = await result.Content.ReadAsStringAsync();
                //return JsonConvert.DeserializeObject<object>(jsonString);
                //response = result.StatusCode.ToString();
                //response = result.Content.ToString();
            }
        }
        return response;
    }
}

