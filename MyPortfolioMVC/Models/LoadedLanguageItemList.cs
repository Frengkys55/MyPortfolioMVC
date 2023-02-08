namespace MyPortfolioMVC.Models
{
    public class LoadedLanguageItemList
    {
        public string LanguageName { get; set; }

        #region Initialization Panel

        public string pnlText1_a { get; set; }
        public string pnlText2_a { get; set; }
        public string pnlText2_b { get; set; }
        public string pnlText3_a { get; set; }
        public string pnlText3_b { get; set; }
        public string pnlText3_c { get; set; }
        public string pnlText4_a { get; set; }
        public string pnlText4_b { get; set; }

        #endregion Initialization Panel

        #region pnlStartMenu
        public string pnlStartMenu_Item_Header_P { get; set; }
        public string pnlStartMenu_Item_pnlMenuAboutMe { get; set; }
        public string pnlStartMenu_Item_pnlMenuMyWork { get; set; }
        public string pnlStartMenu_Item_pnlMenuMyPortfolio { get; set; }
        public string pnlStartMenu_Item_pnlMenuMyEducations { get; set; }
        public string pnlStartMenu_Item_pnlMenuSettings { get; set; }
        public string pnlStartMenu_Item_pnlMenuSetvices { get; set; }
        public string pnlStartMenu_Item_pnlMenuChangelog { get; set; }
        #endregion pnlStartMenu

        #region Wallpaper Information
        public string lblWallpaperSeriesTitle { get; set; }
        public string lblWallpaperArtistTitle { get; set; }
        #endregion Wallpaper Information

        #region My Portfolio
        public string pnlWindowPortfolioTitle { get; set; }
        #endregion My Portfolio

        #region Settings

        #region Settings Sidebar
        public string btnSettingsItemResolution { get; set; }
        public string btnSettingsItemWallpaper { get; set; }
        public string btnSettingsItemAbout { get; set; }
        #endregion Settings Sidebar

        #region Settings Panel

        #region pnlSettingsWallpaperColumn
        public string pnlSettingsWallpaperColumn_Header { get; set; }
        public string pnlSettingsWallpaperColumn_btnApplySettingsWallpaper { get; set; }
        #endregion pnlSettingsWallpaperColumn

        #region pnlSettingsResolutionColumn
        public string pnlSettingsResolutionColumn_Header { get; set; }
        public string pnlSettingsResolutionColumn_Resolution_Title { get; set; }
        public string pnlSettingsResolutionColumn_Resolution_DetectResolution { get; set; }
        public string pnlSettingsResolutionColumn_btnDetectResolution { get; set; }
        public string pnlSettingsResolutionColumn_Scaling_Title { get; set; }

        public string pnlSettingsResolutionColumn_btnApplyResolution { get; set; }
        #endregion pnlSettingsResolutionColumn

        #region pnlSettingsAboutColumn

        #region Desktop Specification
        public string pnlSettingsAboutColumn_Header_DesktopSpecification { get; set; }
        public string pnlSettingsAboutColumn_DesignInspiration { get; set; }
        public string pnlSettingsAboutColumn_Version { get; set; }
        public string pnlSettingsAboutColumn_InstalledOn { get; set; }
        public string pnlSettingsAboutColumn_CreatedUsing { get; set; }
        public string pnlSettingsAboutColumn_DotNetFrameworkVersion { get; set; }
        public string pnlSettingsAboutColumn_DesignedOn { get; set; }
        public string pnlSettingsAboutColumn_CssFramework { get; set; }

        public string pnlSettingsAboutColumn_DesignInspiration_Value { get; set; }
        public string pnlSettingsAboutColumn_Version_Value { get; set; }
        public string pnlSettingsAboutColumn_InstalledOn_Value { get; set; }
        public string pnlSettingsAboutColumn_CreatedUsing_Value { get; set; }
        public string pnlSettingsAboutColumn_DotNetFrameworkVersion_Value { get; set; }
        public string pnlSettingsAboutColumn_DesignedOn_Value { get; set; }
        public string pnlSettingsAboutColumn_CssFramework_Value { get; set; }
        #endregion Desktop Specification

        #region Browser Specification
        public string pnlSettingsAboutColumn_Header_BrowserSpecification { get; set; }
        public string pnlSettingsAboutColumn_Browser { get; set; }
        public string pnlSettingsAboutColumn_BrowserVersion { get; set; }
        public string pnlSettingsAboutColumn_BrowserType { get; set; }
        #endregion Browser Specification

        #endregion pnlSettingsAboutColumn

        #endregion Settings Panel

        #endregion Settings

        #region About Me
        public string pnlWindowAboutMe_Title { get; set; }
        public string pnlWindowAboutMe_JobQualification_Value { get; set; }
        public string pnlWindowAboutMe_Address_Value { get; set; }
        public string pnlWindowAboutMe_Email_Value { get; set; }

        public string pnlWindowAboutMe_UsedTechnologies_Header { get; set; }
        #endregion About Me

        #region Works
        public string pnlWindowWorks_Title { get; set; }
        public string pnlWindowWorks_ListExplanation { get; set; }
        public string pnlWindowWorks_MoreWorks { get; set; }
        #endregion Works

        #region First-time Setup
        public string pnlWindowFirstTimeSetup_Title { get; set; }
        #endregion First-time Setup

        #region Notifications
        public string pnlNotifications_Header { get; set; }
        public string pnlNotifications_btnNotificationClearNotificationseader { get; set; }
        public string pnlNotifications_pnlNoNotification_NoNotification { get; set; }
        #endregion Notifications
    }
}