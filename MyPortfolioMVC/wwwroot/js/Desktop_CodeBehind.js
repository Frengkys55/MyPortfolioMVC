// A code behind for this page
// I wanted to separate this section into a separate file but damn it! import/export thing is anoying...


// #region For initialization panel

function InitializationPanelHeightAdjuster() {
    var height = document.documentElement.clientHeight;
    document.getElementById("pnlInitialization").style.height = (height) + "px";
}

/**
   Function for getting list of available languages
 */
function LanugageListWorker() {

    // Get list
    try {
        var languageList = ConvertJSON(XHRDownloader("/Language/LoadLanguages"));

        // Clean old list (if available)
        ClearInnerHTML("pnlAvailableLanguage");

        // Create list

        for (var i = 0; i < languageList.length; i++) {
            // Button
            var button = document.createElement("button");
            button.id = "btnLanguage" + languageList[i].languageID;
            button.type = "button";
            button.classList.add("w3-bar-item");
            button.classList.add("w3-button");
            button.classList.add("w3-round");
            button.classList.add("w3-border");
            button.classList.add("w3-border-white");
            button.classList.add("w3-margin");
            button.innerText = languageList[i].languageName;
            button.style.minWidth = "200px";
            button.setAttribute("onclick", "btnSetLanguage_Click('" + languageList[i].languageID + "')");

            document.getElementById("pnlAvailableLanguage").appendChild(button);
        }
    }
    catch (exception) {
        console.error(exception);
    }
}

/**
 * Append the selected language to the current url path and reload browser
 * */
function btnSetLanguage_Click(languageID) {
    window.location.href = "/" + languageID;
}

var currentActiveTextPanel = 1;

/**
 * Function to advance the "Initialization" panel
 * */
function btnInitializationNext_Click() {
    // Go to the next panel
    var panelToCheck = "pnlText" + (currentActiveTextPanel + 1).toString();
    if (document.getElementById(panelToCheck) != null) {
        document.getElementById("pnlText" + currentActiveTextPanel.toString()).style.display = "none";
        document.getElementById("pnlText" + (currentActiveTextPanel + 1).toString()).style.display = "block";
        currentActiveTextPanel++;
    }
    else {
        // If the next pnlText returned null then hide the window and display the desktop
        document.getElementById("pnlInitialization").style.display = "none";
        document.getElementById("pnlDesktopContainer").style.display = "block";
    }
}
// #endregion For initialization panel

// #region For desktop

// #region Global functions (Reusable functions for desktops windows)

/**
 * Function to get the selected window to the front
 * 
 * @param {string} windowID ID of the window to move to the front
 * */
function GetWindowToFront(windowID) {
    var zIndex = GetHighestZIndex();

    document.getElementById(windowID).style.zIndex = ++zIndex;
}

/** Function to get the highest z-index from the currently open windows */
function GetHighestZIndex() {
    var zIndex = 0;
    var activeWindows = GetActiveWindows();

    for (var i = 0; i < activeWindows.length; i++) {
        var currentZIndex = document.getElementById(activeWindows[i]).style.zIndex;
        if (zIndex < currentZIndex) zIndex = currentZIndex;
    }
    return zIndex;
}

/**
 * Function to get list of currently open windows
 * @returns {Array<string>}
 * */
function GetActiveWindows() {
    /** @type {Array<string>}*/
    var windowIDs = getElementsByIdStartsWith("pnlDesktopWorkArea", "div", "pnlWindow");

    /** @type {Array<string>}*/
    var activeWindowIDs = [];

    for (var i = 0; i < windowIDs.length; i++) {
        if (document.getElementById(windowIDs[i].id).style.display == "block") {
            activeWindowIDs.push(windowIDs[i].id);
        }
    }

    return activeWindowIDs;
}

/**
 * Function to get list of element using part of ID (from StackOverflow)
 * 
 * @param {string} container    The name of the container ID to get a list of element from
 * @param {string} selectorTag  Name of the HTML Tag
 * @param {string} prefix       String that is part of the beginning of the ID to search
 */
function getElementsByIdStartsWith(container, selectorTag, prefix) {

    // Function from stacoverflow....
    var items = [];
    var myPosts = document.getElementById(container).getElementsByTagName(selectorTag);
    for (var i = 0; i < myPosts.length; i++) {
        //omitting undefined null check for brevity
        if (myPosts[i].id.lastIndexOf(prefix, 0) === 0) {
            items.push(myPosts[i]);
        }
    }
    return items;
}

/**
 * Minimize selected window
 * 
 * @param {string} windowID ID of the window to minimize
 * */
function MinimizeWindow_Click(windowID) {
    document.getElementById(windowID).style.display = "none";
}

/**
 * Maximize the selected window
 * 
 * @param {string} windowID ID of the window to maximize
 * */
function MaximizeWindow_Click(windowID) {

    var window = document.getElementById(windowID);

    // Toggle
    if (document.getElementById(windowID).style.width != "100%" && document.getElementById(windowID).style.height != "100%") {
        // Get the necessary data
        var width = document.getElementById(windowID).style.width;
        var height = document.getElementById(windowID).style.height;
        var originalClass = "w3-display-middle";

        if (!document.getElementById(windowID).classList.contains("w3-display-topleft")) {
            // Replace w3-display-middle to w3-display-topleft
            document.getElementById(windowID).classList.replace("w3-display-middle", "w3-display-topleft");
        }

        // Set attribute for original data
        document.getElementById(windowID).setAttribute("data-originalheight", height);
        document.getElementById(windowID).setAttribute("data-originalwidth", width);
        document.getElementById(windowID).setAttribute("data-originalclass", originalClass);

        // Change window width and height
        document.getElementById(windowID).style.width = "100%";
        document.getElementById(windowID).style.height = "100%";
    }
    else {

        // Get original data from dataset
        var width = document.getElementById(windowID).dataset.originalwidth;
        var height = document.getElementById(windowID).dataset.originalheight;
        var originalClass = document.getElementById(windowID).dataset.originalclass;

        // Restore data
        document.getElementById(windowID).classList.replace("w3-display-topleft", originalClass);
        document.getElementById(windowID).style.width = width;
        document.getElementById(windowID).style.height = height;

        // Remove dataset (No longer needed)
        delete document.getElementById(windowID).dataset.originalwidth;
        delete document.getElementById(windowID).dataset.originalheight;
        delete document.getElementById(windowID).dataset.originalclass;
    }

    // Adjust window content height
    ElementResize();
}

/**
 * Close the selected window
 * 
 * @param {string} windowID ID of the window to close
 * */
function CloseWindow_Click(windowID) {
    document.getElementById(windowID).style.display = "none";
    RemoveFromTaskbar(windowID);
}

/**
 * Clear content from selected ID
 * 
 * @param {string} id ID of where the content should be cleared
 * */
function ClearInnerHTML(id) {
    document.getElementById(id).innerHTML = "";
}

/**
 * Function that contains other functions related to resizing
 */
function ElementResize() {
    // Put function for elements that has to change its data here
    pnlPortfolioListDetailColumnHeightAdjuster();
}

// #endregion Global functions (Reusable functions for desktop windows)

// #endregion For desktop

// #region Taskbar

/**
 * Function to add content to taskbar
 * 
 * @param {string}  windowID        ID of the window to add to the taskbar
 * @param {string}  iconName        Name of the icon for the taskbar (Application uses Line Awesome)
 * @param {boolean} ignoreMinimize  Inform function if the window should be minimizeable
 * */
function AddToTaskbar(windowID, iconName, ignoreMinimize = false) {

    // Check if a window has been opened before by checking the icon on the taskbar. If found then don't make a new icon.
    if (document.getElementById("btnTaskbar_" + windowID) != null) {
        return;
    }

    // If not found, then make a new icon
    var button = document.createElement("button");

    button.id = "btnTaskbar_" + windowID;
    button.type = "button";
    button.classList.add("w3-bar-item");
    button.classList.add("w3-button");
    button.classList.add("w3-transparent");
    button.classList.add("w3-hover-dark-grey");
    button.classList.add("w3-ripple");
    if (!ignoreMinimize) {
        button.setAttribute("onclick", ("TaskbarItem_CLick('" + windowID + "')"));
    }
    button.innerHTML = "<i class=\"la " + iconName + "\"></i>";

    document.getElementById("pnlTaskbarItemGroup").appendChild(button);
}

/** 
 *  Remove selected window icon from taskbar
 *  
 *  @param {string} windowID ID of the window to remove its icon from taskbar
 */
function RemoveFromTaskbar(windowID) {
    document.getElementById("btnTaskbar_" + windowID).remove();
}

/**
 * Function for toggling between minimizing and restoring window
 * 
 * @param {string} windowID ID of the window to toggle
 * */
function TaskbarItem_CLick(windowID) {
    var window = document.getElementById(windowID);
    console.log(windowID);
    if (window.style.display == "none") {
        OpenWindow(windowID);
    }
    else {
        HideWindow(windowID);
    }
}

/** Function to toggle notification panel */
function btnExpandNotification_Click() {
    var window = document.getElementById("pnlNotifications");
    if (window.style.display == "none") {
        OpenWindow("pnlNotifications");
    }
    else {
        HideWindow("pnlNotifications");
    }
}

// #endregion Taskbar

// #region Start Menu

// #region Old function (the previous function uses delegation but it's not working properly, especially if the button contains a different elements)

/**
 * Function to open selected window
 * 
 * @param {string} windowID ID of the window to open
 */
function OpenWindow(windowID) {
    document.getElementById(windowID).style.display = "block";
}

/**
 * Function to minimize selected window window
 * 
 * @param {string} windowID ID of the window to minimize
 **/
function HideWindow(windowID) {
    document.getElementById(windowID).style.display = "none";
}

/**
 * New function for handling start menu item click
 * 
 * @param {string}      sender              ID of panel that triggers this function
 * @param {string}      windowID            ID of the target window to open
 * @param {string}      iconName            Name of the icon to add to taskbar (using Line Awesome)
 * @param {boolean}     preventMinize       Tell function if this window is minimizable or not
 * @param {Function}    functionToExecute   Function to execute after click
 * */
function pnlMenuItem_Click(sender, windowID, iconName, preventMinize = false, functionToExecute) {
    try {
        StartMenuToggle();
        OpenWindow(windowID);
        AddToTaskbar(windowID, iconName, preventMinize);
        GetWindowToFront();
        if (functionToExecute != null) {
            functionToExecute;
        }
    } catch (e) {
        console.error(e);
    }
}

///**
// * Function to handle start menu item click (About Me)
// * */
//function pnlMenuItemAboutMeDisplayContainer_Click() {
//    StartMenuToggle();
//    OpenWindow("pnlWindowAboutMe");
//    AddToTaskbar("pnlWindowAboutMe", "la-user", true);
//    GetWindowToFront("pnlWindowAboutMe");
//}

//function btnMenuItemMyWorkDisplayContainer_Click() {
//    StartMenuToggle();
//    OpenWindow("pnlWindowWorks");
//    AddToTaskbar("pnlWindowWorks", "la-briefcase");
//    pnlWorksMenuWorker();
//    GetWindowToFront("pnlWindowWorks");
//}

function btnMenuItemMyPortfolio_Click() {
    StartMenuToggle();
    OpenWindow("pnlWindowPortfolio");
    AddToTaskbar("pnlWindowPortfolio", "la-address-card");
    // Load side menu
    pnlResumeMenuWorker();

    GetWindowToFront("pnlWindowPortfolio");
}

function pnleMenuItemSettingsDisplayContainer_Click() {
    StartMenuToggle();
    OpenWindow("pnlWindowSettings");
    AddToTaskbar("pnlWindowSettings", "la-gear");
    SettingsWorker();
    GetWindowToFront("pnlWindowSettings");
}

function pnleMenuItemChangelogDisplayContainer_Click() {
    StartMenuToggle();
    OpenWindow("pnlWindowChangelog");
    AddToTaskbar("pnlWindowChangelog", "la-file-alt");
    pnlChangelogMenuWorker();
    GetWindowToFront("pnlWindowChangelog");
}

function pnlUserInfoGroup_Click() {
    StartMenuToggle();
    pnlMenuItemAboutMeDisplayContainer_Click();
}

// #endregion Old function

// #endregion Start Menu

// #region Windows

function DragWindow_Start(windowID) {

}

function DragWindow_End(windowID) {

}

// #region First-Time Setup
function pnlWindowFirstTimeSetupWorker() {
    if (selectedLanguage == "" || selectedLanguage == null) return; // Prevent execution if selected language not set

    // Clear panel
    document.getElementById("pnlIntroduction").innerHTML = XHRDownloader("/" + selectedLanguage + "/Welcome/LoadData");
}
// #endregion First-Time Setup

// #region Settings
function btnSettingsItemWallpaper_Click() {
    document.getElementById("pnlSettingsWallpaperColumn").style.display = "block";
    document.getElementById("pnlSettingsAboutColumn").style.display = "none";
}

function btnSettingsItemAbout_Click() {
    document.getElementById("pnlSettingsWallpaperColumn").style.display = "none";
    document.getElementById("pnlSettingsAboutColumn").style.display = "block";
}

function SettingsWallpaperWorker() {

    // Get a list of wallpapers
    var wallpapers = ConvertJSON(XHRDownloader("/Settings/LoadWallpapers"));

    // Clear old list
    ClearInnerHTML("pnlWallpaperList");

    // Create new list
    for (var i = 0; i < wallpapers.length; i++) {

        var file = wallpapers[i].imageName;
        file = file.substring(0, file.lastIndexOf("."));
        var wallpaperButton = document.createElement("button");
        wallpaperButton.type = "button";
        wallpaperButton.id = "btnSetPreview" + file;
        wallpaperButton.classList.add("w3-bar-item");
        wallpaperButton.classList.add("w3-button");
        wallpaperButton.classList.add("w3-round");
        wallpaperButton.classList.add("w3-ripple");

        wallpaperButton.setAttribute("onclick", "btnSetPreview_Click('" + wallpapers[i].imageName + "')");
        wallpaperButton.innerText = file;

        document.getElementById("pnlWallpaperList").appendChild(wallpaperButton);
    }
}

function btnSetPreview_Click(wallpaper) {
    // Preview wallpaper
    document.getElementById("pnlSettingsWallpaperPreview").style.backgroundImage = "url('/Sources/Background/" + wallpaper + "')";
}

function btnApplySettingsWallpaper_Click() {
    // Apply desktop background from wallpaper preview
    document.getElementById("pnlDesktop").style.backgroundImage = document.getElementById("pnlSettingsWallpaperPreview").style.backgroundImage;

    // Get wallpaper name
    var wallpaperName = document.getElementById("pnlSettingsWallpaperPreview").style.backgroundImage.replace("url(\"/Sources/Background/", "");
    wallpaperName = wallpaperName.replace("\")", "");

    // Get wallpaper information
    SetWallpaperInformation(wallpaperName);
}

function SetWallpaperInformation(wallpaper) {
    var wallpaperInfo = ConvertJSON(XHRDownloader("/Settings/Wallpaper/LoadInfo/" + wallpaper));

    console.log(wallpaperInfo);

    document.getElementById("lblWallpaperSeriesName").innerText = wallpaperInfo.series;
    document.getElementById("lnkWallpaperLink").innerText = wallpaperInfo.author;
    document.getElementById("lnkWallpaperLink").href = wallpaperInfo.imageURL;
}

function SettingsWorker() {
    SettingsWallpaperWorker();
}

// #endregion Settings

// #region Resume

function pnlResumeMenuWorker() {
    if (selectedLanguage == "" || selectedLanguage == null) return; // Prevent execution if selected language not set

    pnlPortfolioMenuItems.addEventListener("click", function (e) {
        pnlPortfolioMenuItem_Click(e); // Pass the event;
    });

    // Get menu list
    var menuJsonObject = ConvertJSON(XHRDownloader("/" + selectedLanguage + "/Portfolio/SideMenuLoader"));

    // Clear panel content
    document.getElementById("pnlPortfolioMenuItems").innerHTML = "";

    // Generate button based on list received above
    for (let i = 0; i < menuJsonObject.value.length; i++) {
        // Create button
        var button = document.createElement("button");
        var icon = document.createElement("i");
        icon.classList.add(menuJsonObject.value[i].icon.iconName.split(" ")[0]);
        icon.classList.add(menuJsonObject.value[i].icon.iconName.split(" ")[1]);
        button.id = "btnResume" + i.toString();
        button.appendChild(icon);
        button.classList.add("w3-bar-item");
        button.classList.add("w3-button");
        button.classList.add("w3-transparent");
        button.classList.add("w3-hover-dark-grey");
        button.classList.add("w3-ripple");
        button.setAttribute("data-menuname", menuJsonObject.value[i].menuName);

        document.getElementById("pnlPortfolioMenuItems").appendChild(button);

        document.getElementById("btnResume" + i.toString()).innerHTML += (" " + menuJsonObject.value[i].menuName);

        // Load the first content
        if (i == 0) pnlResumeContentWorker(menuJsonObject.value[i].menuName);
    }
}

function pnlResumeContentWorker(menuName) {
    if (selectedLanguage == "" || selectedLanguage == null) return; // Prevent execution if selected language not set

    document.getElementById("pnlPortfolioListDetailColumn").innerHTML = ""; // Clear panel

    // Download content
    document.getElementById("pnlPortfolioListDetailColumn").innerHTML += XHRDownloader("/" + selectedLanguage + "/Portfolio/LoadResumeItem/" + menuName);
}

function pnlPortfolioListDetailColumnHeightAdjuster() {
    var windowHeight = parseInt(document.getElementById('pnlWindowPortfolio').style.height);
    // Set the pnlPortfolioListDetailColumn to be the height of the window - the height of the title bar
    if (windowHeight == 500) {
        document.getElementById("pnlPortfolioListDetailColumn").style.height = (windowHeight - 34) + "px";
    }
    else {
        var height = parseInt(document.documentElement.clientHeight);
        console.log(height);
        var windowDetailHeight = (height - 34) - 34;
        document.getElementById("pnlPortfolioListDetailColumn").style.setProperty("height", windowDetailHeight + "px");
    }
}

function pnlPortfolioMenuItem_Click(e) {
    const target = e.target;

    var textData = target.getAttribute("data-menuname");
    pnlResumeContentWorker(textData);
}

// #endregion Resume

// #region Works

// Get list of works done
function pnlWorksMenuWorker() {
    if (selectedLanguage == "" || selectedLanguage == null) return; // Prevent execution if selected language not set

    // Get the work list
    var works = ConvertJSON(XHRDownloader("/" + selectedLanguage + "/api/Work/GetWorks"));

    // Clear old list
    document.getElementById("pnlWorkItemGroup").innerHTML = "";

    // Make the list
    for (var i = 0; i < works.length; i++) {
        var name = works[i].name; // string
        var role = works[i].role; // string
        var technologiesUsed = works[i].technologiesUsed; // string[]
        var imageData = works[i].imageData; // string
        var imageType = works[i].imageType; // string

        // Button
        var button = document.createElement("button");

        button.id = "btnWork" + i.toString();
        button.classList.add("w3-bar-item");
        button.classList.add("w3-transparent");
        button.classList.add("w3-button");
        button.classList.add("w3-ripple");
        button.setAttribute("onclick", ("btnWork_Click(" + (i + 1).toString() + ", '" + name + "')"));

        // Panel work row
        var pnlWorkRow = document.createElement("div");

        pnlWorkRow.id = "pnlWorkRow" + i.toString();
        pnlWorkRow.classList.add("w3-row");
        button.appendChild(pnlWorkRow);


        // Panel work image
        var pnlWorkImageCol = document.createElement("div");
        pnlWorkImageCol.id = "pnlWorkImageCol" + i.toString();
        pnlWorkImageCol.classList.add("w3-col");
        pnlWorkImageCol.classList.add("m3");

        if (imageType === "Image") {
            pnlWorkImageCol.classList.add("desktopBackgroundImage");
            pnlWorkImageCol.setAttribute("style", ("height:100px; background-image:url('" + imageData + "') !important;"));
        }
        else {
            pnlWorkImageCol.classList.add("w3-display-container");
            pnlWorkImageCol.setAttribute("style", "height:100px;");
            var span = document.createElement("span");
            span.classList.add("w3-display-middle");
            span.classList.add("w3-block");
            span.classList.add("w3-center");
            span.innerText = imageData;
            pnlWorkImageCol.appendChild(span);
        }
        pnlWorkRow.appendChild(pnlWorkImageCol);

        // Panel work detail
        var pnlWorkDetailCol = document.createElement("div");

        pnlWorkDetailCol.id = "pnlWorkDetailCol" + i.toString();
        pnlWorkDetailCol.classList.add("w3-col");
        pnlWorkDetailCol.classList.add("m9");
        pnlWorkDetailCol.classList.add("w3-container");
        pnlWorkDetailCol.classList.add("w3-padding");

        pnlWorkRow.appendChild(pnlWorkDetailCol);

        // Header
        var header = document.createElement("header");

        pnlWorkDetailCol.appendChild(header);

        // Header span
        var headerSpan = document.createElement("span");
        headerSpan.innerText = name;

        header.appendChild(headerSpan);

        // Panel role
        var pnlWorkRole = document.createElement("div");
        pnlWorkRole.id = "pnlWorkRole" + i.toString();

        pnlWorkDetailCol.appendChild(pnlWorkRole);

        // Work role icon
        var workRoleIcon = document.createElement("i");
        workRoleIcon.classList.add("la");
        workRoleIcon.classList.add("la-briefcase");

        pnlWorkRole.appendChild(workRoleIcon);

        // Work role text
        var workRoleLabel = document.createElement("label");
        workRoleLabel.innerText = (" " + role);
        pnlWorkRole.appendChild(workRoleLabel);

        // Panel technologies used
        var pnlTechnologiesUsed = document.createElement("div");

        pnlWorkDetailCol.appendChild(pnlTechnologiesUsed);
        for (var j = 0; j < technologiesUsed.length; j++) {
            if (j != 0) {
                pnlTechnologiesUsed.innerHTML += "&nbsp";
            }

            var span = document.createElement("span");
            span.classList.add("w3-tag");
            span.classList.add("w3-tiny");
            span.classList.add("w3-round");
            span.classList.add("w3-dark-grey");
            span.innerText = technologiesUsed[j];
            pnlTechnologiesUsed.appendChild(span);
        }

        // Append button
        document.getElementById("pnlWorkItemGroup").appendChild(button);
    }
}

function pnlWorkDetailWorker(id, workName = "") {
    // Set window title
    document.getElementById("lblWindowWorkDetailTitle").innerText = workName + " - @ViewBag.pnlWindowWorks_Title";

    // Get work details
    document.getElementById("pnlWorkDetailWindow").innerHTML = XHRDownloader(("/" + selectedLanguage + "/api/Work/GetWorkDetail/" + id));
    //document.getElementById("pnlWorkDetailWindow").innerHTML = XHRDownloader(("/api/Work/GetWorkDetail/" + id + "/" + selectedLanguage));
}

function btnWork_Click(id, workName) {
    OpenWindow("pnlWindowWorkDetails");
    GetWindowToFront("pnlWindowWorkDetails");

    // Get details
    pnlWorkDetailWorker(id, workName);
}

// #endregion Works

// #region Changelog

function pnlChangelogMenuWorker() {
    if (selectedLanguage == "" || selectedLanguage == null) return; // Prevent execution if selected language not set

    // Get list
    var changelogList = ConvertJSON(XHRDownloader("/api/Changelog/LoadMenu/"));

    // Clear old list
    ClearInnerHTML("pnlChangelogListColumn");

    // Create new list (Invert the order of display)
    for (var i = changelogList.length - 1; i >= 0; i--) {
        // Load the first content loaded
        if (i === changelogList.length - 1) {
            btnChangelog_Click(changelogList[i].id);
        }

        // Button
        var button = document.createElement("button");
        button.type = "button";
        button.id = "btnChangelog" + changelogList[i].id;
        button.classList.add("w3-bar-item");
        button.classList.add("w3-button");
        button.classList.add("w3-transparent");
        button.classList.add("w3-hover-dark-grey");
        button.classList.add("w3-ripple");
        button.innerText = "Version " + changelogList[i].version;
        button.setAttribute("onclick", ("btnChangelog_Click('" + changelogList[i].id + "')"));

        document.getElementById("pnlChangelogListColumn").appendChild(button);
    }
}

function btnChangelog_Click(id) {
    if (selectedLanguage == "" || selectedLanguage == null) return; // Prevent execution if selected language not set

    document.getElementById("pnlChangelogDetails").innerHTML = XHRDownloader("/" + selectedLanguage + "/api/Changelog/LoadData/" + id);
}

// #endregion Changelog

// #region Not Implemented Window
function btnNotYetImplementedWindowClose_Click() {
    document.getElementById("pnlNotYetImplementedWindow").style.display = "none";
}
// #endregion Not Implemented Window

// #region Notifications

function btnNotificationClearNotifications_Click() {
    // Clear notifications
    document.getElementById("pnlNotificationList").innerHTML = "";

    // Hide panel
    document.getElementById("pnlNotificationList").style.display = "none";

    // Show no notification panel
    document.getElementById("pnlNoNotification").style.display = "block";

    // Close notifications panel
    HideWindow("pnlNotifications");

}

// #endregion Notifications

// #endregion Windows

const pnlPortfolioMenuItems = document.getElementById("pnlPortfolioMenuItems");

/**
 * Application's JavaScript main entry point
 * */
function Page_Load() {
    console.log("trigerred");
    // Add custom icon for the welcome window
    var welcomeButtonIcon = document.createElement("button");
    welcomeButtonIcon.type = "button";
    welcomeButtonIcon.id = "btnTaskbar_pnlWindowFirstTimeSetup";
    welcomeButtonIcon.classList.add("w3-bar-item");
    welcomeButtonIcon.classList.add("w3-button");
    welcomeButtonIcon.classList.add("w3-transparent");
    welcomeButtonIcon.classList.add("w3-hover-dark-grey");
    welcomeButtonIcon.classList.add("profilePicture");
    welcomeButtonIcon.classList.add("profilePictureCover");
    welcomeButtonIcon.classList.add("w3-ripple");
    welcomeButtonIcon.style.height = "34px";
    welcomeButtonIcon.setAttribute("onclick", ("TaskbarItem_CLick('pnlWindowFirstTimeSetup')"));

    document.getElementById("pnlTaskbarItemGroup").appendChild(welcomeButtonIcon);

    // # region Event handler

    

    window.addEventListener("resize", InitializationPanelHeightAdjuster);

    // #endregion Event handler

    // #region Worker
    InitializationPanelHeightAdjuster();
    LanugageListWorker();
    pnlPortfolioListDetailColumnHeightAdjuster();
    pnlWindowFirstTimeSetupWorker();

    // Try loading wallpaper if fail, skip
    try {
        // Get wallpaper url
        var wallpaperName = document.getElementById("pnlDesktop").style.backgroundImage;

        // Extract wallpaper name from path
        var start = wallpaperName.lastIndexOf("/") + 1;
        var end = wallpaperName.indexOf("\")");
        wallpaperName = wallpaperName.substring(start, end);
        console.log(wallpaperName);
        console.log(start);
        console.log(end);
        SetWallpaperInformation(wallpaperName);
    }
    catch (exception) {
        console.log(exception)
    }

    // #endregion Worker

    // Check language
    if (selectedLanguage == "" || selectedLanguage == null) {
        // Just in case
        document.getElementById("pnlInitialization").style.display = "block";

        // Hide desktop (well, it's currently broken so...)
        var desktop = document.getElementById("pnlDesktopContainer");
        desktop.style.display = "none";
    }
    else {
        document.getElementById("pnlLanguageSelection").style.display = "none";
        document.getElementById("pnlTextGroup").style.display = "block";
        document.getElementById("btnInitializationNext").style.display = "block";
    }
}

// Page Lifecycle
//Page_Load();