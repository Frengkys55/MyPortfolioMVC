using MyPortfolioMVC.Models;
using System.Collections.Generic;
using System.IO;
using System.Text.Json.Serialization;
using System.Text.Json;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using JsonException = Newtonsoft.Json.JsonException;

namespace MyPortfolioMVC.Classes
{
    public class PortfolioLoader
    {
        private string path { get; set; }

        /// <summary>
        /// Set from which path this class should be reading files
        /// </summary>
        /// <param name="loadPath">Set absolute path to tell this class where to start reading files</param>
        /// <exception cref="DirectoryNotFoundException"></exception>
        public PortfolioLoader(string loadPath)
        {
            if (!Directory.Exists(loadPath))
            {
                throw new DirectoryNotFoundException("Directory not found. Make sure the entered path was valid.");
            }
            path = loadPath;
        }

        /// <summary>
        /// Function that gives a list of menu list to be displayed in the "Desktop "page
        /// </summary>
        /// <param name="language">Specify which from which language the list should be loaded</param>
        /// <returns>A list of PortfolioMenuInformation containing side menu item to be loaded</returns>
        public List<PortfolioMenuInformation> LoadPortfolioMenuList(string language = "id")
        {
            List<PortfolioMenuInformation> TEMP_portfolioLMenuInformations = new List<PortfolioMenuInformation>();

            //string loadPath = (path.EndsWith("\\")) ? path + language + "\\" : path + "\\" + language + "\\";
            string loadPath = path.EndsWith("\\") ? path + language + "\\" : path + "\\" + language + "\\";

            string[] portfolioItems = Directory.GetDirectories(loadPath);
            foreach (var portfolioItem in portfolioItems)
            {
                string directoryName = new DirectoryInfo(portfolioItem).Name;

                // Load icon json
                string propertiesPath = portfolioItem.EndsWith("\\") ? portfolioItem + "\\properties.json" : portfolioItem + "\\properties.json";
                if (File.Exists(propertiesPath))
                {
                    //PortfolioMenuProperties properties = JsonConvert.DeserializeObject<PortfolioMenuProperties>(File.ReadAllText(propertiesPath));
                    PortfolioMenuProperties properties = new JsonWorker<PortfolioMenuProperties>().ReadJsonFromFile(propertiesPath);
                    PortfolioIcon icon = new PortfolioIcon
                    {
                        IconName = properties.iconName,
                        IconType = properties.iconType
                    };
                    PortfolioMenuInformation menuInformation = new PortfolioMenuInformation();
                    menuInformation.MenuName = directoryName;
                    menuInformation.Icon = icon;
                    menuInformation.DisplayOrder = properties.displayOrder;

                    TEMP_portfolioLMenuInformations.Add(menuInformation);
                }
            }

            // Menu item reorder
            PortfolioMenuInformation[] reorderedInformations = new PortfolioMenuInformation[TEMP_portfolioLMenuInformations.Count];

            for (int i = 0; i < reorderedInformations.Length; i++)
            {
                int itemOrder = TEMP_portfolioLMenuInformations[i].DisplayOrder;
                reorderedInformations[itemOrder] = TEMP_portfolioLMenuInformations[i];
            }

            // Return the values to a list
            List<PortfolioMenuInformation> portfolioLMenuInformations = new List<PortfolioMenuInformation>();

            foreach (var information in reorderedInformations)
            {
                portfolioLMenuInformations.Add(information);
            }

            return portfolioLMenuInformations;
        }

        /// <summary>
        /// Read Json file from selected menu name
        /// </summary>
        /// <param name="MenuName">Specify from which folder that has the same name with the selected menu name a json file should be read</param>
        /// <param name="language">Specify from which language a json file should be loaded</param>
        /// <returns>Json object that has been read and converted to PortfolioSelectedItemData</returns>
        public PortfolioSelectedItemData LoadSelectedData(string MenuName, string language = "id")
        {
            string loadPath = path.EndsWith("\\") ? path + language + "\\" + MenuName + "\\data.json" : path + "\\" + language + "\\" + MenuName + "\\data.json";
            try
            {
                return new JsonWorker<PortfolioSelectedItemData>().ReadJsonFromFile(loadPath);
            }
            catch (JsonException err)
            {
                throw err;
            }
        }
    }
}
