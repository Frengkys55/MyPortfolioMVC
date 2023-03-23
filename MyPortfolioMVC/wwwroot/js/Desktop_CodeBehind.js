// A code behind for this page
// I wanted to separate this section into a separate file but damn it! import/export thing is anoying...

var minimumWorkAreaWidth = 600;
var minimumWorkAreaHeight = 800;
var mobileMode = false;

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

/**
 * Function to get the highest z-index from the currently open windows
 * @returns {number} Return highest found Z-Index
 * */
function GetHighestZIndex() {
    /** @type {number} */
    var zIndex = 0;
    var activeWindows = GetActiveWindows();

    for (var i = 0; i < activeWindows.length; i++) {
        var currentZIndex = document.getElementById(activeWindows[i]).style.zIndex;
        if (zIndex < currentZIndex) zIndex = currentZIndex;
    }
    return zIndex;
}

/**
 * Function to get ID list of the currently open windows
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
 * 
 * */
function HideOtherWindow(activeWindow) {
    var windows = GetActiveWindows();
    for (var i = 0; i < windows.length; i++) {
        if (activeWindow == windows[i]) {
            // Don't hide this window
            continue;
        }
        else {
            MinimizeWindow_Click(windows[i]);
        }
    }
}

/**
 * Close the selected window
 * 
 * @param {string} windowID ID of the window to close
 * */
function CloseWindow_Click(windowID, isUsingNewEngine = false) {
    if (!isUsingNewEngine) {
        document.getElementById(windowID).style.display = "none";
        RemoveFromTaskbar(windowID);
    }
    else {
        document.getElementById(windowID).remove();
        RemoveFromTaskbar(windowID);
    }
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
    try {
        // Try remove the icon from taskbar
        document.getElementById("btnTaskbar_" + windowID).remove();
    } catch (e) {
        console.warn("Can't delete icon. Icon not found. Maybe just there is no icon.");
    }
}

/**
 * Function for toggling between minimizing and restoring window
 * 
 * @param {string} windowID ID of the window to toggle
 * */
function TaskbarItem_CLick(windowID) {
    var window = document.getElementById(windowID);
    if (window.style.display == "none" || window.style.zIndex < GetHighestZIndex()) {
        OpenWindow(windowID);
        GetWindowToFront(windowID);
        if (mobileMode) {
            // Hide all other window if it's in mobile mobile
            HideOtherWindow(window.id);
        }
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
// (also, it's easier to just add event listener and assign it to the button rather than to search and match element)

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
        GetWindowToFront(windowID);
        if (functionToExecute != null) {
            functionToExecute;
        }
    } catch (e) {
        console.error(e);
    }
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
function pnlMenuItem2_Click(sender, windowID, iconName, preventMinize = false, functionToExecute) {
    try {
        StartMenuToggle();
        AddToTaskbar(windowID, iconName, preventMinize);
        if (functionToExecute != null) {
            functionToExecute;
        }
    } catch (e) {
        console.error(e);
    }
}

// #endregion Old function

// #endregion Start Menu

// #region Windows

// #region New Window functions (demo)

/** Define a size of a window */
class WindowSize {
    /** @type {string} */
    Width;

    /** @type {string} */
    Height;

    constructor(width, height) {
        this.Width = width;
        this.Height = height;
    }
}

/** Define the type of a window */
class WindowType {
    Type = {
        Normal: 1,
        MultiWindow: 2
    }
}

/** Define minimize, maximize, and close control behaviour */
class WindowControlsOption {
    /** @type {boolean} */
    EnableMinimize;

    /** @type {boolean} */
    EnableMaximize;

    /** @type {boolean} */
    EnableClose;
}

/** Define a property of a window*/
class WindowProperties {
    /** @type {string}*/
    WindowID;

    /** @type {string} */
    WindowTitleName;

    /** @type {WindowSize}*/
    WindowSize;

    /** @type {string} */
    Styles;

    /** @type {string} */
    CssClass;

    /** @type {WindowType} */
    WindowType;

    /** @type {WindowControlsOption} */
    WindowControlsOption;
}

/** 
 * Window object class (Named WindowClass because there is already an object also named Window)
 * */
class WindowClass extends WindowProperties {
    constructor() {
        super();

    }

    Render() {
        var guid = crypto.randomUUID();
        var styles = this.WindowStyles;
        // #region Window container
        var windowContainer = document.createElement("div");
        windowContainer.id = this.WindowID;

        // Define window styles
        if (styles != null) {
            // If a styles variable is not empty then apply them
            windowContainer.setAttribute("style", styles.Styles);
        }

        // Define window height
        if (this.WindowSize != null) {
            windowContainer.style.height = this.WindowSize.Height;
            windowContainer.style.width = this.WindowSize.Width;
        }
        else {
            // Define new window height and width using the default value
            windowContainer.style.height = "500px";
            windowContainer.style.width = "500px";
        }

        // Define class attribute
        if (this.CssClass != null) {
            windowContainer.className = this.CssClass;
        }
        else {
            windowContainer.classList.add("w3-display-middle");
            windowContainer.classList.add("w3-round");
            windowContainer.classList.add("backdropBlur");
            windowContainer.classList.add("w3-theme-d5");
            windowContainer.classList.add("w3-mobile");
        }

        windowContainer.setAttribute("data-guid", guid);

        // # region Window container

        
        // #region Title bar

        // #region Title bar container
        var titleBar = document.createElement("header");
        titleBar.id = "pnlTitleBarContainer_" + guid;
        titleBar.classList.add("w3-bar");
        titleBar.classList.add("w3-theme-d5");
        titleBar.style.borderRadius = "4px 4px 0px 0px";
        windowContainer.appendChild(titleBar);

        // #endregion Title bar container

        // #region Title bar content

        // Sidemenu hamburger button
        var windowID = this.WindowID;
        var hamburger = document.createElement("button");
        hamburger.id = "btnSidebarWindow_" + guid;
        hamburger.type = "button";
        hamburger.classList.add("w3-bar-item");
        hamburger.classList.add("w3-left");
        hamburger.classList.add("w3-button");
        hamburger.classList.add("w3-transparent");
        hamburger.classList.add("w3-hover-dark-grey");
        hamburger.classList.add("w3-ripple");
        hamburger.classList.add("w3-hide-large");
        hamburger.innerHTML = "<span class=\"material-symbols-sharp w3-small\">menu</span>";
        hamburger.addEventListener("click", function () { SidebarHamburgerMenu_Click(windowID); });
        titleBar.appendChild(hamburger);


        // Window title
        var windowTitle = document.createElement("label");
        windowTitle.id = "lblWindowTitle_" + guid;
        windowTitle.classList.add("w3-bar-item");
        windowTitle.classList.add("blockTextSelection");
        windowTitle.innerHTML = this.WindowTitleName;
        titleBar.appendChild(windowTitle);

        // #region Window button controls

        // Control container
        var controlGroup = document.createElement("div");
        controlGroup.id = "pnlControlGroup";
        controlGroup.classList.add("w3-right");
        titleBar.appendChild(controlGroup);

        if (this.WindowControlsOption != null) {
            if (this.WindowControlsOption.EnableMinimize) {
                // Minimize button
                var minimize = document.createElement("button");
                minimize.id = "btnWindowMinimize_" + guid;
                minimize.classList.add("w3-button");
                minimize.classList.add("w3-bar-item");
                minimize.classList.add("w3-transparent");
                minimize.classList.add("w3-hover-dark-grey");
                minimize.classList.add("w3-ripple");
                minimize.innerHTML = "<span class=\"material-symbols-sharp w3-small\">minimize</span>";
                minimize.addEventListener("click", function (event) { MinimizeWindow_Click(windowContainer.id); });
                controlGroup.appendChild(minimize);
            }

            if (this.WindowControlsOption.EnableMaximize) {
                // Maximize button
                var maximize = document.createElement("button");
                maximize.id = "btnWindowMaximize_" + guid;
                maximize.classList.add("w3-button");
                maximize.classList.add("w3-bar-item");
                maximize.classList.add("w3-transparent");
                maximize.classList.add("w3-hover-dark-grey");
                maximize.classList.add("w3-ripple");
                maximize.innerHTML = "<span class=\"material-symbols-sharp w3-small\">expand_content</span>";
                maximize.addEventListener("click", function (event) { MaximizeWindow_Click(windowContainer.id); });
                controlGroup.appendChild(maximize);
            }

            if (this.WindowControlsOption.EnableClose) {
                // Close button
                var close = document.createElement("button");
                close.id = "btnWindowClose_" + guid;
                close.classList.add("w3-button");
                close.classList.add("w3-bar-item");
                close.classList.add("w3-transparent");
                close.classList.add("w3-hover-dark-grey");
                close.innerHTML = "<span class=\"material-symbols-sharp w3-small\">close</span>";
                close.classList.add("w3-ripple");
                close.addEventListener("click", function (event) { CloseWindow_Click(windowContainer.id, true); });
                controlGroup.appendChild(close);
            }
        }

        // #endregion Window button controls

        // #endregion Title bar content

        // #endregion Title bar

        // #region Content container

        var contentContainer = document.createElement("div");
        contentContainer.id = "pnlContentContainerWindow_" + guid;
        contentContainer.style.width = "100%";
        contentContainer.style.height = "calc( 100% - 34px )";
        contentContainer.style.borderRadius = "0px 0px 4px 4px";
        windowContainer.appendChild(contentContainer);


        // Sidebar
        var sidebarContainer = document.createElement("div");
        sidebarContainer.id = "pnlSidebarContainerWindow_" + guid;
        sidebarContainer.classList.add("w3-sidebar");
        sidebarContainer.classList.add("w3-transparent");
        sidebarContainer.classList.add("w3-collapse");
        sidebarContainer.classList.add("backdropBlur");
        sidebarContainer.classList.add("w3-animate-opacity");
        sidebarContainer.style.width = "250px";
        sidebarContainer.style.height = "calc( 100% - 34px)";
        sidebarContainer.style.borderRadius = "0px 0px 0px 4px";

        contentContainer.appendChild(sidebarContainer);

        var sidebarContent = document.createElement("div");
        sidebarContent.id = "pnlSidebarContentWindow_" + guid;
        sidebarContent.classList.add("w3-bar-block");
        sidebarContainer.appendChild(sidebarContent);

        // Main content
        var content = document.createElement("div");
        content.id = "pnlContentWindow_" + guid;
        content.classList.add("w3-main");
        content.classList.add("w3-container");
        content.style.marginLeft = "250px";
        content.style.height = "100%";
        content.style.overflowY = "scroll";

        contentContainer.appendChild(content);

        // #endregion Content container

        return windowContainer;
    }
}

/**
 * Define a property of an application 
 * */
class Application extends WindowClass {
    /** @type {String} */
    ApplicationName;

    /** @type {Array<string>} */
    ChildWindowIDs;

    /**
     * Define a property of an application 
     * 
     * @param {WindowType} type         Type of the window
     * @param {string} applicationName  ID of the created application
     * @param {string} windowID         ID of the window for the created application
     * */
    constructor(type, applicationName, windowID) {
        super();
        this.ApplicationName = applicationName;
        this.WindowType = type;
        this.WindowID = windowID;
        this.ChildWindowIDs = null;
        this.WindowSize = null;
        this.WindowStyle = null;
        this.WindowTitleName = applicationName;

        this.WindowControlsOption = new WindowControlsOption();
        this.WindowControlsOption.EnableClose = true;
        this.WindowControlsOption.EnableMaximize = true;
        this.WindowControlsOption.EnableMinimize = true;
    }
}

/**
 * Open the sidebar of the requested window
 * 
 * @param {string} windowID ID of the window
 * */
function SidebarHamburgerMenu_Click(windowID) {
    var windowGUID = GetGUID(windowID);
    var sidebarId = "pnlSidebarContainerWindow_" + windowGUID;
    var content = "pnlContentWindow_" + windowGUID;
    if (document.getElementById(sidebarId).style.display == "block") {
        document.getElementById(sidebarId).style.display = "none";
    }
    else {
        document.getElementById(sidebarId).style.display = "block";
    }
}

/**
 * Get data-guid of the requested window 
 * 
 * @returns {string}
 * */
function GetGUID(windowID) {
    return document.getElementById(windowID).dataset.guid;
}

// #endregion New Window functions (demo)

/**
 * Manages what should it do when mouse is dragging a window
 * */
function DragWindow_Start(windowID) {

}

/**
 * Manages what should happen when mouse is done dragging a window
 * */
function DragWindow_End(windowID) {

}

// #region First-Time Setup

/**
 * Function that handles things for the window "First Time Setup"
 * */
function pnlWindowFirstTimeSetupWorker() {
    if (selectedLanguage == "" || selectedLanguage == null) return; // Prevent execution if selected language not set

    // Clear panel
    document.getElementById("pnlIntroduction").innerHTML = XHRDownloader("/" + selectedLanguage + "/Welcome/LoadData");
}
// #endregion First-Time Setup

// #region Settings

/** A part of "Settings" window that handles what happen when "Wallpaper" side menu is clicked */
function btnSettingsItemWallpaper_Click() {
    document.getElementById("pnlSettingsWallpaperColumn").style.display = "block";
    document.getElementById("pnlSettingsAboutColumn").style.display = "none";
}

/** A part of "Settings" window that handles what happen when "About" side menu is clicked */
function btnSettingsItemAbout_Click() {
    document.getElementById("pnlSettingsWallpaperColumn").style.display = "none";
    document.getElementById("pnlSettingsAboutColumn").style.display = "block";
}

/** A part of "Wallpaper" side menu of the "Settings" window that handles wallpaper loading */
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

/** A part of "Wallpaper" side menu of the "Settings" window that preview the selected wallpaper*/
function btnSetPreview_Click(wallpaper) {
    // Preview wallpaper
    document.getElementById("pnlSettingsWallpaperPreview").style.backgroundImage = "url('/Sources/Background/" + wallpaper + "')";
}

/** A part of "Wallpaper" side menu of the "Settings window that sets the current wallpaper to the selected wallpaper*/
function btnApplySettingsWallpaper_Click() {
    // Apply desktop background from wallpaper preview
    document.getElementById("pnlDesktop").style.backgroundImage = document.getElementById("pnlSettingsWallpaperPreview").style.backgroundImage;

    // Get wallpaper name
    var wallpaperName = document.getElementById("pnlSettingsWallpaperPreview").style.backgroundImage.replace("url(\"/Sources/Background/", "");
    wallpaperName = wallpaperName.replace("\")", "");

    // Get wallpaper information
    SetWallpaperInformation(wallpaperName);
}

/**
 * Gets the current information if the wallpaper sets
 * 
 * @param {string} wallpaper The name of the wallpaper (including the extension)
 * */
function SetWallpaperInformation(wallpaper) {
    var wallpaperInfo = ConvertJSON(XHRDownloader("/Settings/Wallpaper/LoadInfo/" + wallpaper));

    document.getElementById("lblWallpaperSeriesName").innerText = wallpaperInfo.series;
    document.getElementById("lnkWallpaperLink").innerText = wallpaperInfo.author;
    document.getElementById("lnkWallpaperLink").href = wallpaperInfo.imageURL;
}

/** Function that handles things for the "Settings" window */
function SettingsWorker() {
    SettingsWallpaperWorker();
}

// #endregion Settings

// #region Resume

/** Function that handles things for the "Resume" window */
function pnlResumeMenuWorker() {
    if (selectedLanguage == "" || selectedLanguage == null) return; // Prevent execution if selected language not set

    // Generate new application window
    var application = new Application(new WindowType().Type.Normal, "Resume", "pnlWindowNewResume");
    application.WindowSize = new WindowSize("800px", "600px");
    document.getElementById("pnlDesktopWorkArea").appendChild(application.Render());

    // Get window to the front
    GetWindowToFront("pnlWindowNewResume");

    var guid = GetGUID("pnlWindowNewResume");

    // Get menu list
    var menuJsonObject = ConvertJSON(XHRDownloader("/" + selectedLanguage + "/Portfolio/SideMenuLoader"));

    // Clear panel content
    document.getElementById("pnlSidebarContentWindow_" + guid).innerHTML = "";

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
        button.addEventListener("click", function (e) { pnlPortfolioMenuItem_Click(e); })

        document.getElementById("pnlSidebarContentWindow_" + guid).appendChild(button);

        document.getElementById("btnResume" + i.toString()).innerHTML += (" " + menuJsonObject.value[i].menuName);

        // Load the first content
        if (i == 0) pnlResumeContentWorker(menuJsonObject.value[i].menuName);
    }
}

/**
 * A part of "Resume" window that handles what should happen when a side menu is clicked
 * 
 * @param {string} menuName Name of the side menu is clicked
 */
function pnlResumeContentWorker(menuName) {
    if (selectedLanguage == "" || selectedLanguage == null) return; // Prevent execution if selected language not set

    var windowID = "pnlWindowNewResume";
    var guid = GetGUID(windowID);

    ClearInnerHTML("pnlContentWindow_" + guid); // Clear panel

    // Download content
    document.getElementById("pnlContentWindow_" + guid).innerHTML += XHRDownloader("/" + selectedLanguage + "/Portfolio/LoadResumeItem/" + menuName);
}

/** A part of "Resume" window that automatically adjust the content height of the "Resume" window */
function pnlPortfolioListDetailColumnHeightAdjuster() {
    var windowHeight = parseInt(document.getElementById('pnlWindowMyPortfolio').style.height);
    // Set the pnlPortfolioListDetailColumn to be the height of the window - the height of the title bar
    if (windowHeight == 500) {
        document.getElementById("pnlPortfolioListDetailColumn").style.height = (windowHeight - 34) + "px";
    }
    else {
        var height = parseInt(document.documentElement.clientHeight);
        var windowDetailHeight = (height - 34) - 34;
        document.getElementById("pnlPortfolioListDetailColumn").style.setProperty("height", windowDetailHeight + "px");
    }
}

/**
 * A part of "Resume" window that handles what happen when an item from the "Resume" window
 * (A delegate)
 * 
 * @param {MouseEvent} e A mouse event click
 */
function pnlPortfolioMenuItem_Click(e) {
    const target = e.target;

    var textData = target.getAttribute("data-menuname");
    pnlResumeContentWorker(textData);
}

// #endregion Resume

// #region Works

// Get list of works done

/** A part of "Works" window that get and display a list of works that has been done */
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

/**
 * A part of "Works" window that load the content of the selected menu item
 * 
 * @param {string}  id          ID of the selected works
 * @param {string}  workName    Name of the work (for  work detail window)
 * */
function pnlWorkDetailWorker(id, workName = "") {
    // Set window title
    document.getElementById("lblWindowWorkDetailTitle").innerText = workName + " - " + document.getElementById("lblWindowWorksTitle").innerHTML;

    // Get work details
    document.getElementById("pnlWorkDetailWindow").innerHTML = XHRDownloader(("/" + selectedLanguage + "/api/Work/GetWorkDetail/" + id));
    //document.getElementById("pnlWorkDetailWindow").innerHTML = XHRDownloader(("/api/Work/GetWorkDetail/" + id + "/" + selectedLanguage));
}

/**
 * A part of "Works" window that handles what happen if a work is clicked
 * 
 * @param {string}  id      ID of the work
 * @param {string}  string  Name of the work
 */
function btnWork_Click(id, workName) {
    OpenWindow("pnlWindowWorkDetails");
    GetWindowToFront("pnlWindowWorkDetails");

    // Get details
    pnlWorkDetailWorker(id, workName);
}

// #endregion Works

// #region Changelog

/** A part of "Changelog" window that handles history of application development */
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

/**
 * A part of "Changelog" that handles what happen if a changelog item is clicked
 * 
 * @param {string} id ID of the changelog item
 * */
function btnChangelog_Click(id) {
    if (selectedLanguage == "" || selectedLanguage == null) return; // Prevent execution if selected language not set

    document.getElementById("pnlChangelogDetails").innerHTML = XHRDownloader("/" + selectedLanguage + "/api/Changelog/LoadData/" + id);
}

// #endregion Changelog

// #region Not Implemented Window

/** Function for closing "Not implemented" window (shouldn't be accessible) */
function btnNotYetImplementedWindowClose_Click() {
    document.getElementById("pnlNotYetImplementedWindow").style.display = "none";
}
// #endregion Not Implemented Window

// #region Notifications


/** A part of "Notification" window that clear all notifications */
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

/** @type {Array<WindowStatus>}*/
var WindowStatusGroup;

function WindowWorker() {
    if (selectedLanguage == "" || selectedLanguage == null) return; // Prevent execution if selected language is not set

    // Switch to mobile mode if screen width is smaller than the minimumWorkAreaWidth
    if (document.documentElement.clientWidth < minimumWorkAreaWidth) {
        mobileMode = true;

        // Get all windows
        var windowIDs = GetAllWindows();

        // Find the highest Z-Index from active windows
        var currentlyHighestZIndex = GetHighestZIndex();

        // Maximize all windows
        for (var i = 0; i < windowIDs.length; i++) {
            var window = windowIDs[i];

            // Skip About Me window
            if (window.id.includes("AboutMe")) continue;

            if (document.getElementById(window.id).style.width != "100%") {
                MaximizeWindow_Click(window.id); // Maximize window
                if (document.getElementById(window.id).style.zIndex < currentlyHighestZIndex) {
                    MinimizeWindow_Click(window.id); // Minimize other window
                }
            }
        }

        // Hide maximize buttons (workaround)
        DisableMaximizeButtons();
    }
    else {
        RestoreMaximizeButtons();
    }
}

/** Disable all maximize buttons */
function DisableMaximizeButtons() {
    // Get all windows
    var availableWindows = GetAllWindows();

    // Disable all maximize button IDs
    for (var i = 0; i < availableWindows.length; i++) {
        // Get window name by removing part of window id
        var windowName = availableWindows[i].id.replace("pnlWindow", "");
        var maximizeButtonId = "btnWindow" + windowName + "Maximize";

        if (document.getElementById(maximizeButtonId) != null) {
            document.getElementById(maximizeButtonId).style.display = "none";
            document.getElementById(maximizeButtonId).classList.add("w3-disabled");
        }
    }
}

/** Enable all maximize buttons */
function RestoreMaximizeButtons() {

    // Get all available windows
    var availableWindows = GetAllWindows();

    for (var i = 0; i < availableWindows.length; i++) {
        // Get window name by removing part of windod id
        var windowName = availableWindows[i].id.replace("pnlWindow", "");
        var maximizeButtonId = "btnWindow" + windowName + "Maximize";

        if (document.getElementById(maximizeButtonId) != null) {
            document.getElementById(maximizeButtonId).style.display = "block";
            document.getElementById(maximizeButtonId).className = document.getElementById(maximizeButtonId).className.replace("w3-disabled", "");
        }

        // Restore window state (by triggering the maximize buttons...)
        if (document.getElementById(availableWindows[i].id).style.width == "100%") {
            MaximizeWindow_Click(availableWindows[i].id);
        }
    }
}

/**
 * Function to get all windows
 * 
 * @returns {Array<Element>}
 */
function GetAllWindows() {
    return getElementsByIdStartsWith("pnlDesktopWorkArea", "div", "pnlWindow");
}



// #endregion Windows

const pnlPortfolioMenuItems = document.getElementById("pnlPortfolioMenuItems");

/**
 * Application's JavaScript main entry point
 * */
function Page_Load() {
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
    window.addEventListener("resize", function () { WindowWorker(); });

    // #endregion Event handler

    // #region Worker
    InitializationPanelHeightAdjuster();
    LanugageListWorker();
    //pnlPortfolioListDetailColumnHeightAdjuster();
    pnlWindowFirstTimeSetupWorker();
    WindowWorker();

    // Try loading wallpaper if fail, skip
    try {
        // Get wallpaper url
        var wallpaperName = document.getElementById("pnlDesktop").style.backgroundImage;

        // Extract wallpaper name from path
        var start = wallpaperName.lastIndexOf("/") + 1;
        var end = wallpaperName.indexOf("\")");
        wallpaperName = wallpaperName.substring(start, end);
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