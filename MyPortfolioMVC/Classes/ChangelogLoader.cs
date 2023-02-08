using MyPortfolioMVC.Models;
using System.Collections.Generic;
using System.IO;
using System.Web;

namespace MyPortfolioMVC.Classes
{
    public class ChangelogLoader
    {
        private string loadPath { get; set; }

        public ChangelogLoader(string loadPath)
        {
            this.loadPath = (loadPath.EndsWith("\\") ? loadPath + "" : loadPath + "\\");
        }

        public List<ChangelogProperties> LoadChangelogList(string language = "id")
        {
            List<ChangelogMenuInformation> loadedChangelogs = new List<ChangelogMenuInformation>();

            // Get list of folders
            string[] changelogs = Directory.GetDirectories(loadPath);
            foreach (string changelog in changelogs)
            {
                // Remove the other path and read only the folder name
                ChangelogMenuInformation changelogMenuInformation = new ChangelogMenuInformation();
                changelogMenuInformation.Id = changelog.Split('\\')[^1];
                loadedChangelogs.Add(changelogMenuInformation);
            }

            // Get properties
            List<ChangelogProperties> loadedProperties = new List<ChangelogProperties>();
            foreach (ChangelogMenuInformation item in loadedChangelogs)
            {
                ChangelogProperties properties = LoadProperties(item.Id, language);

                // Add extra Id
                properties.Id = item.Id;

                loadedProperties.Add(properties);
            }
            
            return loadedProperties;
        }

        public ChangelogData LoadChangelogData(string version, string language = "id")
        {
            string filePath = loadPath + version + "\\" + language + "\\data.json";

            return new JsonWorker<ChangelogData>().ReadJsonFromFile(filePath);
        }

        public ChangelogProperties LoadProperties(string id, string language = "id")
        {
            string filePath = loadPath + id + "\\" + language + "\\properties.json";
            return new JsonWorker<ChangelogProperties>().ReadJsonFromFile(filePath);
        }
    }
}
