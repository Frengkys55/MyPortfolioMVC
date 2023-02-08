using MyPortfolioMVC.Models;
using System.IO;

namespace MyPortfolioMVC.Classes
{
    public class WelcomeLoader
    {
        private string Path { get; set; }

        /// <summary>
        /// Sets where function should load files from
        /// </summary>
        /// <param name="path"></param>
        /// <exception cref="DirectoryNotFoundException"></exception>
        public WelcomeLoader(string path)
        {
            if (!Directory.Exists(path))
            {
                throw new DirectoryNotFoundException("Directory not found. Make sure the provided path is valid");
            }
            Path = path;
        }
        
        /// <summary>
        /// Load "data.json" file from path provided
        /// </summary>
        /// <param name="language">Which language of the data.json should be loaded</param>
        /// <returns></returns>
        /// <exception cref="FileNotFoundException"></exception>
        public WelcomeData LoadData(string language = "id")
        {
            string dataPath = (Path.EndsWith("\\")) ? Path + "data.json" : Path + "\\data.json";
            if (File.Exists(dataPath))
            {
                return new JsonWorker<WelcomeData>().ReadJsonFromFile(dataPath);
            }
            else
            {
                throw new FileNotFoundException("File not found. Make sure the file exist in the requested directory");
            }
        }
    }
}
