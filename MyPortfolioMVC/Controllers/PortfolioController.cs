using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using System;
using MyPortfolioMVC.Classes;
using MyPortfolioMVC.Models;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace MyPortfolioMVC.Controllers
{

    /// <summary>
    /// Controller for portfolio window
    /// </summary>
    public class PortfolioController : Controller
    {
        Microsoft.AspNetCore.Hosting.IWebHostEnvironment environment;

        /// <summary>
        /// Used to get environment variables from IWebHostEnvironment
        /// </summary>
        /// <param name="environment"></param>
        public PortfolioController(IWebHostEnvironment environment)
        {
            this.environment = environment;
        }

        /// <summary>
        /// Get list of menu available
        /// </summary>
        /// <param name="language">Language of the menu name to be loaded</param>
        /// <returns>JSON data of loaded side menu</returns>
        public JsonResult SideMenuLoader(string language)
        {
            PortfolioLoader portfolioLoader = new Classes.PortfolioLoader((this.environment.WebRootPath.EndsWith("//")) ? this.environment.WebRootPath + "Portfolio" : this.environment.WebRootPath + "\\Portfolio");
            JsonResult result = new JsonResult(portfolioLoader.LoadPortfolioMenuList(language));

            result.ContentType = "application/json";
            result.StatusCode = 200;
            result.SerializerSettings = new JsonSerializerOptions();

            return Json(result);
        }

        /// <summary>
        /// Load HTML content of from the selected menu
        /// </summary>
        /// <param name="language">Language of the content to be loaded</param>
        /// <param name="id">The name of the menu</param>
        /// <returns>HTML content of the selected menu</returns>
        public ActionResult LoadResumeItem(string language, string id)
        {
            string loadPath = ((environment.WebRootPath.EndsWith('\\')) ? environment.WebRootPath + "Portfolio" : environment.WebRootPath + "\\Portfolio") ;
            string loadedLanguage = language;

            Classes.PortfolioLoader portfolioLoader = new PortfolioLoader(loadPath);

            PortfolioSelectedItemData portfolioSelectedItemData = portfolioLoader.LoadSelectedData(id, loadedLanguage);

            List<KeyValuePair<string, string>> listItemCollection = new List<KeyValuePair<string, string>>();

            foreach (string detail in portfolioSelectedItemData.Data)
            {
                string key = detail.Split('|')[0];
                string value = detail.Replace(key + "|", "");
                listItemCollection.Add(new KeyValuePair<string, string>(key, value));
            }

            return Content(Classes.HTMLGenerator.BuatHTML(listItemCollection));
        }
    }
}
