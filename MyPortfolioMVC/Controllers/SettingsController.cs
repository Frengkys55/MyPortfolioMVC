using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using MyPortfolioMVC.Models;
using System.Collections.Generic;

namespace MyPortfolioMVC.Controllers
{
    /// <summary>
    /// Settings controller for settings window
    /// </summary>
    public class SettingsController : Controller
    {
        Microsoft.AspNetCore.Hosting.IWebHostEnvironment environment;

        /// <summary>
        /// Used to get environment variables from IWebHostEnvironmen
        /// </summary>
        /// <param name="environment"></param>
        public SettingsController(IWebHostEnvironment environment)
        {
            this.environment = environment;
        }

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

        /// <summary>
        /// Load informations about a given wallpaper
        /// </summary>
        /// <param name="id">Wallpaper name</param>
        /// <returns>JSON information data of given wallpaper</returns>
        [HttpGet("Settings/Wallpaper/LoadInfo/{id}")]
        public JsonResult LoadWallpaperInformation(string id)
        {
            string pysicalPath = environment.WebRootPath;

            SettingsWallpaper wallpaper = new Classes.SettingsLoader((pysicalPath.EndsWith("\\")) ? pysicalPath + "Sources\\Background" : pysicalPath + "\\Sources\\Background").LoadWallpaperInfo(id);

            return Json(wallpaper);
        }
    }
}
