using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using MyPortfolioMVC.Classes;
using MyPortfolioMVC.Models;
using System.Collections.Generic;

namespace MyPortfolioMVC.Controllers
{
    public class LanguageController : Controller
    {
        //public IActionResult Index()
        //{
        //    return View();
        //}

        Microsoft.AspNetCore.Hosting.IWebHostEnvironment environment;
        public LanguageController(IWebHostEnvironment environment)
        {
            this.environment = environment;
        }

        [HttpGet("Language/LoadLanguages")]
        public IActionResult LoadAvailableLanguage()
        {
            string path = (environment.WebRootPath.EndsWith("\\")) ? environment.WebRootPath + "Languages\\" : environment.WebRootPath + "\\Languages\\";

            // Get language IDs
            string[] languageIDs =new LanguageLoader(path).LoadAvailableLanguage();

            // Get language names
            List<LanguageProperties> languages = new List<LanguageProperties>();

            foreach (string languageID in languageIDs)
            {
                LanguageProperties languageProperties = new LanguageProperties()
                {
                    LanguageID = languageID,
                    LanguageName = new Classes.JsonWorker<LoadedLanguageItemList>().ReadJsonFromFile(path + languageID + ".json").LanguageName
                };

                languages.Add(languageProperties);
            }
            return Json(languages);
        }
    }
}
