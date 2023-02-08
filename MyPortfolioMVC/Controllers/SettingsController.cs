using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using MyPortfolioMVC.Models;
using System.Collections.Generic;

namespace MyPortfolioMVC.Controllers
{
    public class SettingsController : Controller
    {
        Microsoft.AspNetCore.Hosting.IWebHostEnvironment environment;
        public SettingsController(IWebHostEnvironment environment)
        {
            this.environment = environment;
        }

        //public IActionResult Index()
        //{
        //    return View();
        //}

        /// <summary>
        /// Get list of available wallpapers
        /// </summary>
        /// <returns>JSON array of the loaded wallpapers</returns>
        [HttpGet("Settings/LoadWallpapers")]
        public JsonResult LoadWallpapers()
        {
            string pysicalPath = environment.WebRootPath;
            List<SettingsWallpaper> wallpapers = new Classes.SettingsLoader((pysicalPath.EndsWith("\\")) ? pysicalPath + "Sources\\Background" : pysicalPath + "\\Sources\\Background").LoadWallpapers();

            return Json(wallpapers);
        }

        [HttpGet("Settings/Wallpaper/LoadInfo/{id}")]
        public IActionResult LoadWallpaperInformation(string id)
        {
            string pysicalPath = environment.WebRootPath;

            SettingsWallpaper wallpaper = new Classes.SettingsLoader((pysicalPath.EndsWith("\\")) ? pysicalPath + "Sources\\Background" : pysicalPath + "\\Sources\\Background").LoadWallpaperInfo(id);

            return Json(wallpaper);
        }
    }
}
