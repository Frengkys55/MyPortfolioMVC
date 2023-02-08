using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using MyPortfolioMVC.Classes;
using MyPortfolioMVC.Models;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;

namespace MyPortfolioMVC.Controllers
{
    public class ServicesController : Controller
    {
        Microsoft.AspNetCore.Hosting.IWebHostEnvironment environment;
        public ServicesController(IWebHostEnvironment environment)
        {
            this.environment = environment;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult LoadMenuList(string language)
        {
            string path = (environment.WebRootPath.EndsWith("\\")) ? environment.WebRootPath + "Serivces" : environment.WebRootPath + "\\Services";

            ServiceLoader serviceLoader = new ServiceLoader(path);
            return Json(serviceLoader.LoadMenuList(language));
        }
        
        public IActionResult LoadData(string language, string id)
        {
            string nameTemp = id;
            string path = environment.WebRootPath.EndsWith("\\") ? environment.WebRootPath + "Services" : environment.WebRootPath + "\\Services";

            try
            {
                ServiceLoader serviceLoader = new ServiceLoader(path);
                ServiceMenuData data = serviceLoader.LoadData(nameTemp, language);

                List<KeyValuePair<string, string>> list = new List<KeyValuePair<string, string>>();

                foreach (var item in data.Data)
                {
                    string key = item.Split("|")[0];
                    string value = item.Replace((key + "|"), "");

                    list.Add(new KeyValuePair<string, string>(key, value));
                }

                return Content(HTMLGenerator.BuatHTML(list));
            }
            catch (System.Exception)
            {
                throw;
            }
            
        }
    }
}
