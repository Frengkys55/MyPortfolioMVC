// "Code behind" for page Desktop.
// Why is that? because I still think the way ASP.NET WebForm separated code and html is way better.

//import { GetJSON } from "./JSONRequestWorker.js";

function MinimizeWindow_Click(windowID) {
    document.getElementById(windowID).style.display = "none";
}

function MaximizeWindow_Click(windowID) {

}

function CloseWindow_Click(windowID) {
    document.getElementById(windowID).style.display = "none";
}

// #region Start Menu

function OpenWindow(windowID) {
    document.getElementById(windowID).style.display = "block";
}

function pnlMenuItemAboutMeDisplayContainer_Click() {
    OpenWindow("pnlWindowAboutMe");
}

function btnMenuItemMyWorkDisplayContainer_Click() {
    OpenWindow("pnlWindowWorks");
}

function btnMenuItemMyPortfolio_Click() {
    OpenWindow("pnlWindowPortfolio");
    // Load side menu
    pnlResumeMenuLoader();
}

function btnMenuItemMyEducationsDisplayContainer_Click() {
    OpenWindow("pnlWindowAboutMe");
}

function pnleMenuItemSettingsDisplayContainer_Click() {
    OpenWindow("pnlWindowSettings");
}

function pnleMenuItemServicesDisplayContainer_Click() {
    OpenWindow("pnlWindowServices");
}

function pnleMenuItemChangelogDisplayContainer_Click() {
    OpenWindow("pnlWindowChangelog");
}

function pnlUserInfoGroup_Click() {
    pnlMenuItemAboutMeDisplayContainer_Click();
}

// #region Start Menu

// #region Windows

// #region Settings
function btnSettingsItemWallpaper_Click() {

}

function btnSettingsItemAbout_Click() {

}
// #endregion Settings

// #region Resume

// Should be called immediatelly to prevent undefined result
function pnlResumeMenuWorker() {
    console.log(GetJSON("/Portfolio/SideMenuLoader"));
}

// #endregion Resume

// #region Not Implemented Window
function btnNotYetImplementedWindowClose_Click() {
    document.getElementById("pnlNotYetImplementedWindow").style.display = "none";
}
// #endregion Not Implemented Window

// #endregion Settings


function Page_OnLoad() {

    // #region Resume

    pnlResumeMenuWorker();

    // #endregion Resume

}