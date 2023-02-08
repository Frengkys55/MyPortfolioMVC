using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Mvc;
using MyPortfolioMVC.Classes;
using MyPortfolioMVC.Models;
using System;
using System.Collections.Generic;

namespace MyPortfolioMVC.Controllers
{
    public class WorkController : Controller
    {
        Microsoft.AspNetCore.Hosting.IWebHostEnvironment environment;
        public WorkController(IWebHostEnvironment environment)
        {
            this.environment = environment;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetWorks(string language)
        {
            string webRootPath = (environment.WebRootPath.EndsWith("\\")) ? environment.WebRootPath : environment.WebRootPath + "\\";

            string loadedLanguage = language;

            return Json(new Classes.WorksLoader(webRootPath + "Works").LoadWorks(webRootPath + "Works",loadedLanguage));
        }

        public ActionResult GetWorkDetail(string language, int id)
        {
            try
            {
                string webRootPath = (environment.WebRootPath.EndsWith("\\")) ? environment.WebRootPath : environment.WebRootPath + "\\";

                string loadedLanguage = "id";

                WorkDetails workDetails = new WorksLoader(webRootPath + "Works").LoadDetails(id, loadedLanguage);

                List<KeyValuePair<string, string>> listItemCollection = new List<KeyValuePair<string, string>>();

                foreach (string detail in workDetails.Data)
                {
                    string key = detail.Split('|')[0];
                    string value = detail.Replace(key + "|", "");
                    listItemCollection.Add(new KeyValuePair<string, string>(key, value));
                }

                return Content(Classes.HTMLGenerator.BuatHTML(listItemCollection));
            }
            catch (Exception err)
            {
                return Content(Classes.ErrorClass.standardError(err, "Error!"));
            }
        }
    }
}
