using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using MyPortfolioMVC.Classes;
using MyPortfolioMVC.Models;
using System.Collections.Generic;

namespace MyPortfolioMVC.Controllers
{
    /// <summary>
    /// Controller for the language selection window
    /// </summary>
    public class LanguageController : Controller
    {

        Microsoft.AspNetCore.Hosting.IWebHostEnvironment environment;

        /// <summary>
        /// Used to get environment variables from IWebHostEnvironment
        /// </summary>
        /// <param name="environment"></param>
        public LanguageController(IWebHostEnvironment environment)
        {
            this.environment = environment;
        }

        /// <summary>
        /// Load languages available to use
        /// </summary>
        /// <returns></returns>
        [HttpGet("Language/LoadLanguages")]
        public IActionResult LoadAvailableLanguage()
        {
            try
            {
                string path = (environment.WebRootPath.EndsWith("\\")) ? environment.WebRootPath + "Languages\\" : environment.WebRootPath + "\\Languages\\";

                // Get language IDs
                string[] languageIDs = new LanguageLoader(path).LoadAvailableLanguage();

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
            catch (System.Exception err)
            {
                List<LanguageProperties> noLanguage = new List<LanguageProperties>();

                LanguageProperties noLanguageFound = new LanguageProperties()
                {
                    LanguageID = "",
                    LanguageName = "No language files found"
                };
                noLanguage.Add(noLanguageFound);

                return Json(noLanguage);
            }
            
        }
    }
}
