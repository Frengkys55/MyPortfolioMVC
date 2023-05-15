using System;

namespace MyPortfolioMVC.Models
{
    /// <summary>
    /// Contains informastions about a wallpaper
    /// </summary>
    public class SettingsWallpaper
    {
        /// <summary>
        /// The type of a wallpaper. A game, a TV show etc
        /// </summary>
        public string Type { get; set; }

        /// <summary>
        /// Which series is the wallpaper is from (eg. Genshin Impact)
        /// </summary>
        public string Series { get; set; }

        /// <summary>
        /// Who is making the wallpaper
        /// </summary>
        public string Author { get; set; }

        /// <summary>
        /// Where can the wallpaper be found
        /// </summary>
        public string ImageURL { get; set; }

        /// <summary>
        /// The the name of the image with the extension
        /// </summary>
        public string? ImageName { get; set; }
    }
}
