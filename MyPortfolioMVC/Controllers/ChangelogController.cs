﻿using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using MyPortfolioMVC.Classes;
using MyPortfolioMVC.Models;
using System.Collections.Generic;

namespace MyPortfolioMVC.Controllers
{
    /// <summary>
    /// Controller for changelog window
    /// </summary>
    [ApiController]
    [Route("/api/[controller]")]
    public class ChangelogController : ControllerBase
    {
        Microsoft.AspNetCore.Hosting.IWebHostEnvironment environment;

        /// <summary>
        /// Used to get environment variables from IWebHostEnvironment
        /// </summary>
        /// <param name="environment"></param>
        public ChangelogController(IWebHostEnvironment environment)
        {
            this.environment = environment;
        }

        /// <summary>
        /// Load list of changelogs available
        /// </summary>
        /// <returns></returns>
        [HttpGet("/api/[controller]/LoadMenu/")]
        public IEnumerable<ChangelogProperties> LoadMenu()
        {
            string changelogPath = (environment.WebRootPath.EndsWith("\\") ? environment.WebRootPath + "Changelogs" : environment.WebRootPath + "\\Changelogs");
            return new Classes.ChangelogLoader(changelogPath).LoadChangelogList().ToArray();
        }

        /// <summary>
        /// Load selected changelog HTML data
        /// </summary>
        /// <param name="language">Language of the changelog to be loaded</param>
        /// <param name="id">The ID of the changelog</param>
        /// <returns></returns>
        [HttpGet("/{language}/api/[controller]/[action]/{id}")]
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
                return new BadRequestResult();
            }
        }

        /// <summary>
        /// Load properties of a version by id
        /// </summary>
        /// <param name="id">The ID of which folder of a wanted version is located</param>
        /// <returns>Properties of a changelog</returns>
        [HttpGet("/api/[controller]/{id}")]
        public ChangelogProperties LoadProperties(int id)
        {
            string language = "id";
            string loadPath = (environment.WebRootPath.EndsWith("\\")) ? environment.WebRootPath + "Changelogs" : environment.WebRootPath + "\\Changelogs";
            return new ChangelogLoader(loadPath).LoadProperties(id.ToString(), language);
        }
    }
}
