using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using MyPortfolioMVC.Models;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace MyPortfolioMVC.Controllers
{
    [ApiController]
    [Route("api/aboutme")]
    public class AboutMeController : Controller
    {
        IWebHostEnvironment _environment;

        /// <summary>
        /// Used to get environment variables from IWebhostEnvironment
        /// </summary>
        /// <param name="environment"></param>
        public AboutMeController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        /// <summary>
        /// Returns language list for the window "About Me"
        /// </summary>
        /// <returns></returns>
        [Route("GetLanguage/{id}")]
        public IActionResult GetWindowTextLanguage(string id)
        {
            return Content("Hello World " + id);
        }

        /// <summary>
        /// Get available skill sets
        /// </summary>
        /// <returns></returns>
        [Route("GetSkills")]
        public IEnumerable<SkillSetModel> LoadSkillSets()
        {
            string aboutMePath = Path.Combine(_environment.WebRootPath, "AboutMe", "SkillSets");
            try
            {
                return new Classes.AboutMeLoader(aboutMePath).LoadSkills().ToList();
            }
            catch (System.Exception err)
            {
                List<SkillSetModel> noSkill = new List<SkillSetModel>();

                SkillSetModel skillSetModel = new SkillSetModel
                {
                    Name = "Something just happened, hence this message",
                    IconUrl = "/sources/images/bocchi_down.jpg"
                };

                noSkill.Add(skillSetModel);
                return noSkill;
            }
        }

        [Route("GetContent/{language}")]
        public AboutMeContentModel LoadContent(string language)
        {
            string contentPath = Path.Combine(_environment.WebRootPath, "AboutMe", "Contents");
            try
            {
                return new Classes.AboutMeLoader(contentPath).LoadContent(language);
            }
            catch (System.Exception err)
            {
                AboutMeContentModel noContent = new AboutMeContentModel
                {
                    WindowTitle = "No contents was found",
                    HeaderName = "No contents was found"
                };
                return noContent;
            }
        }
    }
}
