using Newtonsoft.Json;
using System.IO;
using System;
using MyPortfolioMVC.Models;

namespace MyPortfolioMVC.Classes
{
    public class LanguageLoader
    {
        private string localPath;

        /// <summary>
        /// Where should this class is loading the language from. The path should be an absolute path like "C:\App\Languages\" and not "~\Languages\"
        /// </summary>
        /// <param name="localLoadPath">Absolute path where language sould be loaded from.</param>
        public LanguageLoader(string localLoadPath)
        {
            localPath = localLoadPath;
        }


        public LoadedLanguageItemList IndexPageLoadLanguage(string language = "id")
        {
            // Prepare which language should be loaded
            string loadedLangPath = localPath.EndsWith("\\") ? localPath + language + ".json" : localPath + "\\" + language + ".json";

            //string loadedJson = File.ReadAllText(loadedLangPath);

            return new JsonWorker<LoadedLanguageItemList>().ReadJsonFromFile(loadedLangPath);
        }

        /// <summary>
        /// Get a list of available languages
        /// </summary>
        /// <returns>Array of languages available to load</returns>
        public string[] LoadAvailableLanguage()
        {
            string[] loadedList = Directory.GetFiles(localPath);

            for (int i = 0; i < loadedList.Length; i++)
            {
                loadedList[i] = Path.GetFileNameWithoutExtension(loadedList[i]);
            }
            return loadedList;
        }
    }
}
