using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using MyPortfolioMVC.Classes;
using MyPortfolioMVC.Models;
using System.Collections.Generic;

namespace MyPortfolioMVC.Controllers
{
    public class ChangelogController : Controller
    {
        Microsoft.AspNetCore.Hosting.IWebHostEnvironment environment;
        public ChangelogController(IWebHostEnvironment environment)
        {
            this.environment = environment;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult LoadMenu()
        {
            string changelogPath = (environment.WebRootPath.EndsWith("\\") ? environment.WebRootPath + "Changelogs" : environment.WebRootPath + "\\Changelogs");
            return Json(new Classes.ChangelogLoader(changelogPath).LoadChangelogList());
        }

        public IActionResult LoadData(string language, int id)
        {
            string loadPath = (environment.WebRootPath.EndsWith("\\") ? environment.WebRootPath + "Changelogs": environment.WebRootPath + "\\Changelogs");

            try
            {
                // Load changelog data
                ChangelogData changelogData = new Classes.ChangelogLoader(loadPath).LoadChangelogData(id.ToString(), language);

                // Convert data to List of key value pair
                List<KeyValuePair<string, string>> changelogDataArray = new List<KeyValuePair<string, string>>();
                foreach (var data in changelogData.Data)
                {
                    string key = data.Split('|')[0];
                    string value = data.Replace((key + "|"), "");
                    changelogDataArray.Add(new KeyValuePair<string, string>(key, value));
                }

                return Content(HTMLGenerator.BuatHTML(changelogDataArray));

            }
            catch (System.Exception err)
            {
                throw;
            }
        }

        public IActionResult LoadProperties(int id)
        {
            string language = "id";
            string loadPath = (environment.WebRootPath.EndsWith("\\")) ? environment.WebRootPath + "Changelogs" : environment.WebRootPath + "\\Changelogs";
            return Json(new ChangelogLoader(loadPath).LoadProperties(id.ToString(), language));
        }
    }
}
