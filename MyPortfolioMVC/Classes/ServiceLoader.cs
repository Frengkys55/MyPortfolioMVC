using Microsoft.CodeAnalysis.CSharp.Syntax;
using MyPortfolioMVC.Models;
using System.Collections.Generic;
using System.IO;

namespace MyPortfolioMVC.Classes
{
    
    public class ServiceLoader
    {
        private string LoadPath { get; set; }

        public ServiceLoader(string loadPath)
        {
            if (!Directory.Exists(loadPath))
            {
                throw new DirectoryNotFoundException("Direktori tidak ditemukan. Pastikan directori yang dimasukkan sudah sesuai.");
            }
            LoadPath = (loadPath.EndsWith("\\")) ? loadPath : loadPath + "\\";
        }

        public List<ServicesMenuInformation> LoadMenuList(string language = "id")
        {

            List<ServicesMenuInformation> servicesMenuInformation = new List<ServicesMenuInformation>();

            // Get directories
            string[] loadedList = Directory.GetDirectories(LoadPath + language);

            foreach (string item in loadedList)
            {
                string folderName = item.Split('\\')[^1];
                // Load properties from loaded file name
                ServiceMenuProperties properties = new JsonWorker<ServiceMenuProperties>().ReadJsonFromFile(LoadPath + language + "\\" + folderName + "\\properties.json");

                ServicesMenuInformation menu = new ServicesMenuInformation
                {
                    Name = folderName,
                    Properties = properties
                };
                servicesMenuInformation.Add(menu);
            }

            return servicesMenuInformation;
        }

        public ServiceMenuData LoadData (string menuName,string language = "id")
        {
            string filePath = LoadPath + language + "\\" + menuName + "\\data.json";
            try
            {
                return new JsonWorker<ServiceMenuData>().ReadJsonFromFile(filePath);
            }
            catch (System.Exception err)
            {
                throw err;
            }
        }
    }
}
