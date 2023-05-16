using MyPortfolioMVC.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System;

namespace MyPortfolioMVC.Classes
{
    public class WorksLoader
    {
        string loadPath = String.Empty;

        [Obsolete("Hanya gunakan jika hanya menggunakan fungsi WorksLoader()")]
        public WorksLoader()
        {
            loadPath = String.Empty;
        }

        public WorksLoader(string LoadPath)
        {
            if (!Directory.Exists(LoadPath))
            {
                throw new DirectoryNotFoundException("Directori tidak ditemukan.");
            }
            this.loadPath = LoadPath;
        }

        public List<Work> LoadWorks(string path, string language = "id")
        {
            List<Work> loadedWorks = new List<Work>();

            if (!Directory.Exists(path))
            {
                throw new DirectoryNotFoundException("Directory tidak ditemukan.");
            }

            string[] directories = Directory.GetDirectories(path);
            foreach (string directory in directories)
            {
                string workFilePath = directory + (directory.EndsWith("\\") ? "" : "\\") + language + "\\work.json";

                if (!File.Exists(workFilePath))
                {
                    continue; // Skip folder if there is no "work.json" file found
                }
                string jsonString = File.ReadAllText(workFilePath);
                loadedWorks.Add(JsonConvert.DeserializeObject<Work>(jsonString));
            }

            return loadedWorks;
        }

        public WorkDetails LoadDetails(int workID, string Language = "id")
        {
            string fileToLoad = (loadPath.EndsWith("\\")) ? loadPath + workID + "\\" + Language + "\\details.json" : loadPath + "\\" + workID + "\\" + Language + "\\details.json";

            try
            {
                string loadedData = File.ReadAllText(fileToLoad);
                return JsonConvert.DeserializeObject<WorkDetails>(loadedData);
            }
            catch (Exception err)
            {
                throw err;
            }
        }
    }
}
