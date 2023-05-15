using Microsoft.VisualBasic;
using MyPortfolioMVC.Models;
using System.Collections.ObjectModel;
using System.IO;

namespace MyPortfolioMVC.Classes
{
    /// <summary>
    /// Loader for the controller "About Me"
    /// </summary>
    public class AboutMeLoader
    {
        readonly string loadPath = string.Empty;

        /// <summary>
        /// Loader for controller "About Me"
        /// </summary>
        /// <param name="loadPath">Where is the folder AboutMe is located</param>
        public AboutMeLoader(string loadPath)
        {
            this.loadPath = loadPath;
        }

        #region Skills
        /// <summary>
        /// Get available skills
        /// </summary>
        /// <returns></returns>
        public Collection<SkillSetModel> LoadSkills()
        {
            Collection<SkillSetModel> skillSets = new Collection<SkillSetModel>();

            try
            {
                string[] availableSkills = Directory.GetFiles(loadPath, "*.json");
                foreach (string s in availableSkills)
                {
                    skillSets.Add(LoadSkill(Path.GetFileName(s)));
                }
            }
            catch (System.Exception err)
            {
                throw;
            }
            
            return skillSets;
        }

        /// <summary>
        /// Load a skill from disk
        /// </summary>
        /// <param name="fileName">Name of the file to read skill information from</param>
        /// <returns></returns>
        public SkillSetModel LoadSkill(string fileName)
        {
            string combinedPath = Path.Combine(loadPath, fileName);
            return new JsonWorker<SkillSetModel>().ReadJsonFromFile(combinedPath);
        }
        #endregion Skills

        #region Contents
        public AboutMeContentModel LoadContent(string language)
        {
            string combinedPath = Path.Combine(loadPath, language + ".json");
            return new JsonWorker<AboutMeContentModel>().ReadJsonFromFile(combinedPath);
        }
        #endregion Contents
    }
}
