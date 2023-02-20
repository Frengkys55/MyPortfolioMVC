using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Mvc;
using MyPortfolioMVC.Classes;
using MyPortfolioMVC.Models;
using System;
using System.Collections.Generic;

namespace MyPortfolioMVC.Controllers
{
    /// <summary>
    /// API Controller for work related requests
    /// </summary>
    [ApiController]
    [Route("/api/[controller]")]
    public class WorkController : Controller
    {
        Microsoft.AspNetCore.Hosting.IWebHostEnvironment environment;

        /// <summary>
        /// Used for get environment variables from IWebHostEnvironment (used for getting physical path of the application)
        /// </summary>
        /// <param name="environment"></param>
        public WorkController(IWebHostEnvironment environment)
        {
            this.environment = environment;
        }

        /// <summary>
        /// Get list of works done
        /// </summary>
        /// <param name="language">Load specific language of the work data</param>
        /// <returns>JSON of works loaded</returns>
        [HttpGet("/{language}/api/[controller]/[action]/")]
        public JsonResult GetWorks(string language)
        {
            string webRootPath = (environment.WebRootPath.EndsWith("\\")) ? environment.WebRootPath : environment.WebRootPath + "\\";

            string loadedLanguage = language;

            return Json(new Classes.WorksLoader(webRootPath + "Works").LoadWorks(webRootPath + "Works",loadedLanguage));
        }

        /// <summary>
        /// Get the detail of the selected work
        /// </summary>
        /// <param name="language">Specific language of the work to be loaded</param>
        /// <param name="id">The ID of the work</param>
        /// <returns>HTML data of the selected work</returns>
        [HttpGet("/{language}/api/[controller]/[action]/{id}")]
        public IActionResult GetWorkDetail(string language, int id)
        {
            try
            {
                string webRootPath = (environment.WebRootPath.EndsWith("\\")) ? environment.WebRootPath : environment.WebRootPath + "\\";

                string loadedLanguage = language;

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
