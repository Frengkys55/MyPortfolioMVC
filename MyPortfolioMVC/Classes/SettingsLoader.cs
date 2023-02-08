using Microsoft.Extensions.Primitives;
using MyPortfolioMVC.Models;
using System.Collections.Generic;
using System.IO;

namespace MyPortfolioMVC.Classes
{

    /// <summary>
    /// Created just to load wallpaper...
    /// </summary>
    public class SettingsLoader
    {
        private string Path { get; set; }

        /// <summary>
        /// Set the class with the location where the class should be loading files from.
        /// </summary>
        /// <param name="path">The absolute path where this class should loading files from.</param>
        /// <exception cref="DirectoryNotFoundException"></exception>
        public SettingsLoader(string path)
        {
            if (!Directory.Exists(path))
            {
                throw new DirectoryNotFoundException("The given path does not exist.");
            }

            Path = path;
        }

        /// <summary>
        /// Get a list of wallpaper in the selected folder
        /// </summary>
        /// <returns>A list of wallpapers alongside their informations</returns>
        /// <exception cref="FileNotFoundException"></exception>
        public List<SettingsWallpaper> LoadWallpapers()
        {
            List<SettingsWallpaper> wallpapers = new List<SettingsWallpaper>();

            // Read files (only file name) from selected folder
            string[] loadedImageWithPaths = Directory.GetFiles(Path);
            List<string> loadedImages = new List<string>();
            foreach (string imagePath in loadedImageWithPaths)
            {
                if (!File.Exists(imagePath))
                {
                    throw new FileNotFoundException("Can't find the image");
                }

                string imageFileName = System.IO.Path.GetFileName(imagePath);

                loadedImages.Add(imageFileName);
            }

            // Setup JSON load folder path
            string jsonPath = (Path.EndsWith("\\")) ? Path + "JSON" : Path + "\\JSON"; 

            // Load json data from loaded files
            foreach (string filename in loadedImages)
            {
                // Load json file
                string wallpaperJsonPath = jsonPath + "\\" + System.IO.Path.GetFileNameWithoutExtension(filename) + ".json";

                if (!File.Exists(wallpaperJsonPath))
                {
                    throw new FileNotFoundException("Can't find the json of the image: " + filename);
                }

                SettingsWallpaper wallpaper = new JsonWorker<SettingsWallpaper>().ReadJsonFromFile(wallpaperJsonPath);
                wallpaper.ImageName = filename;
                wallpapers.Add(wallpaper);
            }

            return wallpapers;
        }

        /// <summary>
        /// Get the information of the image
        /// </summary>
        /// <param name="imageName">The name of the image including the extension</param>
        /// <returns>The information about the wallpaper</returns>
        /// <exception cref="FileNotFoundException"></exception>
        public SettingsWallpaper LoadWallpaperInfo(string imageName)
        {
            // Setup JSON load folder path
            string jsonPath = (Path.EndsWith("\\")) ? Path + "JSON" : Path + "\\JSON";

            // Load json file
            string wallpaperJsonPath = jsonPath + "\\" + System.IO.Path.GetFileNameWithoutExtension(imageName) + ".json";

            if (!File.Exists(wallpaperJsonPath))
            {
                throw new FileNotFoundException("Can't find the json of the image: " + imageName);
            }

            SettingsWallpaper wallpaper = new JsonWorker<SettingsWallpaper>().ReadJsonFromFile(wallpaperJsonPath);
            wallpaper.ImageName = imageName;

            return wallpaper;

        }
    }
}
