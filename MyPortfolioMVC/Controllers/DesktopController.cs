using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using MyPortfolioMVC.Classes;
using MyPortfolioMVC.Models;
using System.Collections.Generic;

namespace MyPortfolioMVC.Controllers
{
    /// <summary>
    /// The main controller of the application
    /// </summary>
    public class DesktopController : Controller
    {
        Microsoft.AspNetCore.Hosting.IWebHostEnvironment environment;

        /// <summary>
        /// Used to get environment variables from IWebHostEnvironment
        /// </summary>
        /// <param name="environment"></param>
        public DesktopController(IWebHostEnvironment environment)
        {
            this.environment = environment;
        }

        /// <summary>
        /// The main page
        /// </summary>
        /// <param name="language">Language of the page to be loaded</param>
        /// <returns></returns>
        public IActionResult Index(string language)
        {

            // Language check
            if (language == string.Empty || language == null)
            {
                ViewBag.selectedLanguage = "";
                return View(); // Return as broken page...
            }

            #region Language processing

            // Set language
            ViewBag.selectedLanguage = language;

            string selectedLanguage = language;

            LanguageLoader languageLoader = new Classes.LanguageLoader(environment.WebRootPath + "/Languages/");
            LoadedLanguageItemList loadedList = languageLoader.IndexPageLoadLanguage(selectedLanguage);

            #region Language item list

            #region Initialization Panel
            ViewBag.pnlText1_a = loadedList.pnlText1_a;
            ViewBag.pnlText2_a = loadedList.pnlText2_a;
            ViewBag.pnlText2_b = loadedList.pnlText2_b;
            ViewBag.pnlText3_a = loadedList.pnlText3_a;
            ViewBag.pnlText3_b = loadedList.pnlText3_b;
            ViewBag.pnlText3_c = loadedList.pnlText3_c;
            ViewBag.pnlText4_a = loadedList.pnlText4_a;
            ViewBag.pnlText4_b = loadedList.pnlText4_b;
            #endregion Inifialization Panel

            #region pnlStartMenu
            ViewBag.pnlStartMenu_Item_Header_P              = loadedList.pnlStartMenu_Item_Header_P;
            ViewBag.pnlStartMenu_Item_pnlMenuAboutMe        = loadedList.pnlStartMenu_Item_pnlMenuAboutMe;
            ViewBag.pnlStartMenu_Item_pnlMenuMyWork         = loadedList.pnlStartMenu_Item_pnlMenuMyWork;
            ViewBag.pnlStartMenu_Item_pnlMenuMyPortfolio    = loadedList.pnlStartMenu_Item_pnlMenuMyPortfolio;
            ViewBag.pnlStartMenu_Item_pnlMenuMyEducations   = loadedList.pnlStartMenu_Item_pnlMenuMyEducations;
            ViewBag.pnlStartMenu_Item_pnlMenuSettings       = loadedList.pnlStartMenu_Item_pnlMenuSettings;
            ViewBag.pnlStartMenu_Item_pnlMenuSetvices       = loadedList.pnlStartMenu_Item_pnlMenuSetvices;
            ViewBag.pnlStartMenu_Item_pnlMenuChangelog      = loadedList.pnlStartMenu_Item_pnlMenuChangelog;
            #endregion pnlStartMenu

            #region Wallpaper Information
            ViewBag.lblWallpaperSeriesTitle = loadedList.lblWallpaperSeriesTitle;
            ViewBag.lblWallpaperArtistTitle = loadedList.lblWallpaperArtistTitle;
            #endregion Wallpaper Information

            #region My Portfolio
            ViewBag.pnlWindowPortfolioTitle = loadedList.pnlWindowPortfolioTitle;
            #endregion My Portfolio

            #region Settings

            ViewBag.lblWindowSettingsTitle = loadedList.pnlStartMenu_Item_pnlMenuSettings;

            #region Settings Sidebar
            ViewBag.btnSettingsItemResolution   = loadedList.btnSettingsItemResolution;
            ViewBag.btnSettingsItemWallpaper    = loadedList.btnSettingsItemWallpaper;
            ViewBag.btnSettingsItemAbout        = loadedList.btnSettingsItemAbout;
            #endregion Settings Sidebar

            #region Settings Panel

            #region pnlSettingsWallpaperColumn
            ViewBag.pnlSettingsWallpaperColumn_Header                       = loadedList.pnlSettingsWallpaperColumn_Header;
            ViewBag.pnlSettingsWallpaperColumn_btnApplySettingsWallpaper    = loadedList.pnlSettingsWallpaperColumn_btnApplySettingsWallpaper;
            #endregion pnlSettingsWallpaperColumn

            #region pnlSettingsResolutionColumn
            ViewBag.pnlSettingsResolutionColumn_Header                      = loadedList.pnlSettingsResolutionColumn_Header;
            ViewBag.pnlSettingsResolutionColumn_Resolution_Title            = loadedList.pnlSettingsResolutionColumn_Header;
            ViewBag.pnlSettingsResolutionColumn_Resolution_DetectResolution = loadedList.pnlSettingsResolutionColumn_Resolution_DetectResolution;
            ViewBag.pnlSettingsResolutionColumn_btnDetectResolution         = loadedList.pnlSettingsResolutionColumn_btnDetectResolution;
            ViewBag.pnlSettingsResolutionColumn_Scaling_Title               = loadedList.pnlSettingsResolutionColumn_Scaling_Title;

            ViewBag.pnlSettingsResolutionColumn_btnApplyResolution          = loadedList.pnlSettingsResolutionColumn_btnApplyResolution;
            #endregion pnlSettingsResolutionColumn

            #region pnlSettingsAboutColumn

            #region Desktop Specification
            ViewBag.pnlSettingsAboutColumn_Header_DesktopSpecification  = loadedList.pnlSettingsAboutColumn_Header_DesktopSpecification;
            ViewBag.pnlSettingsAboutColumn_DesignInspiration            = loadedList.pnlSettingsAboutColumn_DesignInspiration;
            ViewBag.pnlSettingsAboutColumn_Version                      = loadedList.pnlSettingsAboutColumn_Version;
            ViewBag.pnlSettingsAboutColumn_InstalledOn                  = loadedList.pnlSettingsAboutColumn_InstalledOn;
            ViewBag.pnlSettingsAboutColumn_CreatedUsing                 = loadedList.pnlSettingsAboutColumn_CreatedUsing;
            ViewBag.pnlSettingsAboutColumn_DotNetFrameworkVersion       = loadedList.pnlSettingsAboutColumn_DotNetFrameworkVersion;
            ViewBag.pnlSettingsAboutColumn_DesignedOn                   = loadedList.pnlSettingsAboutColumn_DesignedOn;
            ViewBag.pnlSettingsAboutColumn_CssFramework                 = loadedList.pnlSettingsAboutColumn_CssFramework;

            ViewBag.pnlSettingsAboutColumn_DesignInspiration_Value      = loadedList.pnlSettingsAboutColumn_DesignInspiration_Value;
            ViewBag.pnlSettingsAboutColumn_Version_Value                = loadedList.pnlSettingsAboutColumn_Version_Value;
            ViewBag.pnlSettingsAboutColumn_InstalledOn_Value            = loadedList.pnlSettingsAboutColumn_InstalledOn_Value;
            ViewBag.pnlSettingsAboutColumn_CreatedUsing_Value           = loadedList.pnlSettingsAboutColumn_CreatedUsing_Value;
            ViewBag.pnlSettingsAboutColumn_DotNetFrameworkVersion_Value = loadedList.pnlSettingsAboutColumn_DotNetFrameworkVersion_Value;
            ViewBag.pnlSettingsAboutColumn_DesignedOn_Value             = loadedList.pnlSettingsAboutColumn_DesignedOn_Value;
            ViewBag.pnlSettingsAboutColumn_CssFramework_Value           = loadedList.pnlSettingsAboutColumn_CssFramework_Value;
            #endregion Desktop Specification

            #region Browser Specification
            ViewBag.pnlSettingsAboutColumn_Header_BrowserSpecification  = loadedList.pnlSettingsAboutColumn_Header_BrowserSpecification;
            ViewBag.pnlSettingsAboutColumn_Browser                      = loadedList.pnlSettingsAboutColumn_Browser;
            ViewBag.pnlSettingsAboutColumn_BrowserVersion               = loadedList.pnlSettingsAboutColumn_BrowserVersion;
            ViewBag.pnlSettingsAboutColumn_BrowserType                  = loadedList.pnlSettingsAboutColumn_BrowserType;
            #endregion Browser Specification

            #endregion pnlSettingsAboutColumn

            #endregion Settings Panel

            #endregion Settings

            #region About Me
            ViewBag.pnlWindowAboutMe_Title                  = loadedList.pnlWindowAboutMe_Title;
            ViewBag.pnlWindowAboutMe_JobQualification_Value = loadedList.pnlWindowAboutMe_JobQualification_Value;
            ViewBag.pnlWindowAboutMe_Address_Value          = loadedList.pnlWindowAboutMe_Address_Value;
            ViewBag.pnlWindowAboutMe_Email_Value            = loadedList.pnlWindowAboutMe_Email_Value;

            ViewBag.pnlWindowAboutMe_UsedTechnologies_Header = string.Empty;
            #endregion About Me

            #region Works
            ViewBag.pnlWindowWorks_Title            = loadedList.pnlWindowWorks_Title;
            ViewBag.pnlWindowWorks_ListExplanation  = loadedList.pnlWindowWorks_ListExplanation;
            ViewBag.pnlWindowWorks_MoreWorks        = loadedList.pnlWindowWorks_MoreWorks;
            #endregion Works

            #region First-time Setup
            ViewBag.pnlWindowFirstTimeSetup_Title   = loadedList.pnlWindowFirstTimeSetup_Title;
            #endregion First-time Setup

            ViewBag.lblWindowChangelogTitle = loadedList.pnlStartMenu_Item_pnlMenuChangelog;

            #endregion Language item list

            #endregion Language Processing

            #region Window data reading

            #endregion Window data reading

            #region Window Data

            #region Wallpaper infomration
            ViewBag.lblWallpaperSeriesName  = "Not Available";
            ViewBag.lnkWallpaperLinkAddress = "#";
            ViewBag.lnkWallpaperLinkName    = "Not Available";
            #endregion Wallpaper information

            #region Notifications
            ViewBag.pnlNotifications_Header = loadedList.pnlNotifications_Header;
            ViewBag.pnlNotifications_btnNotificationClearNotificationseader = loadedList.pnlNotifications_btnNotificationClearNotificationseader;
            ViewBag.pnlNotifications_pnlNoNotification_NoNotification = loadedList.pnlNotifications_pnlNoNotification_NoNotification;
            #endregion Notifications


            #endregion Window data

            return View();
        }
    }
}