using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using MyPortfolioMVC.Models;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace MyPortfolioMVC.Controllers
{
    /// <summary>
    /// Controler for the welcome window
    /// </summary>
    public class WelcomeController : Controller
    {
        Microsoft.AspNetCore.Hosting.IWebHostEnvironment environment;

        /// <summary>
        /// Used to get environment variables from IWebHostEnvironmen
        /// </summary>
        /// <param name="environment"></param>
        public WelcomeController(IWebHostEnvironment environment)
        {
            this.environment = environment;
        }

        /// <summary>
        /// Return data for Welcome window to load in HTML format
        /// </summary>
        /// <returns></returns>
        public IActionResult LoadData(string language)
        {
            // Prepare path and language
            string loadPath = (!environment.WebRootPath.EndsWith("\\")) ? environment.WebRootPath + "\\Welcome\\" + language + "\\" : environment.WebRootPath + "Welcome\\" + language + "\\";

            WelcomeData welcomeData = new Classes.WelcomeLoader(loadPath).LoadData(language);

            // Convert to HTML;
            List<KeyValuePair<string, string>> data = new List<KeyValuePair<string, string>>();
            foreach (var item in welcomeData.Data)
            {
                // Split data into key value pair
                string key = item.Split("|")[0];
                string value = item.Replace(key + "|", "");
                data.Add(new KeyValuePair<string, string>(key, value));
            }

            return Content(Classes.HTMLGenerator.BuatHTML(data));
        }

    }
}
