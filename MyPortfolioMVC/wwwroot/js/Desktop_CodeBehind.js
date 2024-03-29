﻿// A code behind for this page
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
        var originalClass = document.getElementById(windowID).className;
        var originalPositionLeft = document.getElementById(windowID).style.left;
        var originalPositionTop = document.getElementById(windowID).style.top;

        if (!document.getElementById(windowID).classList.contains("w3-display-topleft")) {
            // Replace w3-display-middle to w3-display-topleft
            document.getElementById(windowID).classList.replace("w3-display-middle", "w3-display-topleft");
        }

        // Set attribute for original data
        document.getElementById(windowID).setAttribute("data-originalheight", height);
        document.getElementById(windowID).setAttribute("data-originalwidth", width);
        document.getElementById(windowID).setAttribute("data-originalclass", originalClass);
        document.getElementById(windowID).setAttribute("data-originalpositionleft", originalPositionLeft);
        document.getElementById(windowID).setAttribute("data-originalpositiontop", originalPositionTop);
        
        // Change window width and height
        document.getElementById(windowID).style.width = "100%";
        document.getElementById(windowID).style.height = "100%";

        // Check for a new window type by checking if GetGUID will return null or not
        if (GetGUID(windowID) != null) {
            document.getElementById(windowID).style.top = "0px";
            document.getElementById(windowID).style.left = "0px";
        }
    }
    else {

        // Get original data from dataset
        var width = document.getElementById(windowID).dataset.originalwidth;
        var height = document.getElementById(windowID).dataset.originalheight;
        var originalClass = document.getElementById(windowID).dataset.originalclass;
        var originalPositionLeft = document.getElementById(windowID).dataset.originalpositionleft;
        var originalPositionTop = document.getElementById(windowID).dataset.originalpositiontop;

        // Restore data
        document.getElementById(windowID).className = originalClass;
        document.getElementById(windowID).style.top = originalPositionTop;
        document.getElementById(windowID).style.left = originalPositionLeft;
        document.getElementById(windowID).style.width = width;
        document.getElementById(windowID).style.height = height;

        // Remove dataset (No longer needed)
        delete document.getElementById(windowID).dataset.originalwidth;
        delete document.getElementById(windowID).dataset.originalheight;
        delete document.getElementById(windowID).dataset.originalclass;
        delete document.getElementById(windowID).dataset.originalpositionleft;
        delete document.getElementById(windowID).dataset.originalpositiontop;
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

/**
 * Define the type of a window
 * 
 * Normal = Window with sidebar and main content
 * MultiWindow = Not used
 * Single = Window without the sidebar
 * */
class WindowType {
    Type = {
        Normal: 1,
        MultiWindow: 2,
        Single: 3
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

    /** Method to render the window container without the content
     * (call this method if you need an empty window) */
    RenderWindowContainer() {
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
        //windowContainer.classList.add("w3-display-middle");
        windowContainer.classList.add("w3-round");
        windowContainer.classList.add("backdropBlur");
        windowContainer.classList.add("w3-theme-d5");
        windowContainer.classList.add("w3-mobile");
        windowContainer.classList.add("w3-card");

        windowContainer.setAttribute("data-guid", guid);

        // Define window position attribute
        windowContainer.style.position = "absolute";
        windowContainer.style.left = ((document.documentElement.clientWidth * 0.5) - Number(windowContainer.style.width.replace("px", "")) * 0.5) + "px";
        windowContainer.style.top = ((document.documentElement.clientHeight * 0.5) - Number(windowContainer.style.width.replace("px", "")) * 0.5) + "px";

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

        if (this.WindowType == new WindowType().Type.Normal) {
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
        }

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
                close.classList.add("w3-hover-red");
                close.innerHTML = "<span class=\"material-symbols-sharp w3-small\">close</span>";
                close.classList.add("w3-ripple");
                close.addEventListener("click", function (event) { CloseWindow_Click(windowContainer.id, true); });
                controlGroup.appendChild(close);
            }
        }

        // #endregion Window button controls

        // Taskbar eventlistener
        titleBar.addEventListener("mousedown", function (event) {
            DragWindow(event, windowContainer.id);
        });

        titleBar.addEventListener("touchstart", function (event) {
            TouchDragWindow(event, windowContainer.id);
        });

        // #endregion Title bar content

        // #endregion Title bar

        // #region Content container

        var contentContainer = document.createElement("div");
        contentContainer.id = "pnlContentContainerWindow_" + guid;
        contentContainer.style.width = "100%";
        contentContainer.style.height = "calc( 100% - 34px )";
        contentContainer.style.borderRadius = "0px 0px 4px 4px";
        windowContainer.appendChild(contentContainer);

        // #endregion Content container

        return windowContainer;
    }

    /** Render the window with the content (including sidebar) */
    Render() {
        var windowContainer = this.RenderWindowContainer();

        var guid = windowContainer.dataset.guid;

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

        windowContainer.lastElementChild.appendChild(sidebarContainer);

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

        if (this.CssClass != null) {
            content.className = this.CssClass;
        }

        windowContainer.lastElementChild.appendChild(content);
        return windowContainer;
        
    }
}

class WindowNormal extends WindowClass {
    // Inherit everything from WindowClass and change nothing (the default behaviour was build for this class)
    constructor() {
        super();
        this.WindowType = new WindowType().Type.Normal;
    }
}

class WindowSingle extends WindowClass {
    constructor() {
        super();
        this.WindowType = new WindowType().Type.Single;
    }

    /** Render the window with the content (without sidebar) */
    Render() {
        var windowContainer = this.RenderWindowContainer();
        var guid = windowContainer.dataset.guid;

        // Main content
        var content = document.createElement("div");
        content.id = "pnlContentWindow_" + guid;
        content.classList.add("w3-container");
        content.style.height = "100%";
        content.style.overflowY = "scroll";

        if (this.CssClass != null || this.CssClass != undefined) {
            content.className = this.CssClass;
        }

        windowContainer.lastElementChild.appendChild(content);
        return windowContainer;
    }
}


/**
 * Define a property of an application 
 * */
class Application{
    /** @type {String} */
    ApplicationName;

    /** @type {Array<string>} */
    ChildWindowIDs;

    /** @type {WindowProperties} */
    WindowProperties;

    /**
     * Define a property of an application 
     * 
     * @param {WindowType} type         Type of the window
     * @param {string} applicationName  ID of the created application
     * @param {string} windowID         ID of the window for the created application
     * */
    constructor(type, applicationName, windowID) {
        this.ApplicationName = applicationName;
        this.WindowProperties = new WindowProperties();
        this.WindowProperties.WindowType = type;
        this.WindowProperties.WindowID = windowID;
        this.ChildWindowIDs = null;
        this.WindowProperties.WindowSize = null;
        this.WindowProperties.Styles = null;
        this.WindowProperties.WindowTitleName = applicationName;

        this.WindowProperties.WindowControlsOption = new WindowControlsOption();
        this.WindowProperties.WindowControlsOption.EnableClose = true;
        this.WindowProperties.WindowControlsOption.EnableMaximize = true;
        this.WindowProperties.WindowControlsOption.EnableMinimize = true;
    }

    /**
     * Render the window
     * @returns {HTMLDivElement}
     * */
    Render() {
        var windowType = this.WindowProperties.WindowType;

        /** @type {WindowClass} */
        var window = null;

        // Declare new window object
        if (windowType == new WindowType().Type.Normal) {
            window = new WindowNormal();
            
        }
        else if (windowType == new WindowType().Type.Single) {
            var window = new WindowSingle();
        }

        window.WindowID = this.WindowProperties.WindowID;
        window.WindowSize = this.WindowProperties.WindowSize;
        window.CssClass = this.WindowProperties.CssClass;
        window.Styles = this.WindowProperties.Styles;
        window.WindowControlsOption = this.WindowProperties.WindowControlsOption;
        window.WindowSize = this.WindowProperties.WindowSize;
        window.WindowTitleName = this.WindowProperties.WindowTitleName;

        return window.Render();
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
 * 
 * @param {MouseEvent}  e        Mouse event
 * @param {string}      windowID ID of the window to be dragged
 * */
function DragWindow(e, windowID) {

    // Get window to the front
    GetWindowToFront(windowID);

    // Get cursor's initial position
    var initialMouseXPos = e.clientX;
    var initialMouseYPos = e.clientY;

    // Find the offset between the center of the window and the current cursor position
    // when user presses the mouse
    var mouseOffsetX = initialMouseXPos - Number(document.getElementById(windowID).style.left.replace("px", ""));
    var mouseOffsetY = initialMouseYPos - Number(document.getElementById(windowID).style.top.replace("px", ""));

    /**
     * The mouse drag main function
     * 
     * @param {MouseEvent} event        Pass the mouse event to this function
     * @param {string}     window_ID    ID of the window to apply the mouse event to
     * */
    var dragWindow_mainFunction = function (event, window_ID) {
        event.preventDefault();

        if (document.getElementById(windowID).style.width == "100%" || document.getElementById(windowID).style.height == "100%") {
            console.log("Window is maximized");
            MaximizeWindow_Click(windowID);
        }

        // Get guid
        var guid = GetGUID(window_ID);

        // Get cursor position
        var x = event.clientX;
        var y = event.clientY;

        var window = document.getElementById(window_ID);
        if (x > 0) {
            window.style.left = (x - mouseOffsetX) + "px";
        }

        if (y > 0) {
            window.style.top = (y - mouseOffsetY) + "px";
        }
    }

    var dragWindow_drag = function (event) {
        dragWindow_mainFunction(event, windowID);
    }

    document.addEventListener("mouseup", function () {
        document.removeEventListener("mousemove", dragWindow_drag);
    });

    document.addEventListener("mousemove", dragWindow_drag);
}

/**
 * Manages what should it do when a touch is dragging a window (an exact replica from DragWindow for mouse touch event)
 * 
 * @param {TouchEvent}  e           Touch event
 * @param {string}      windowID    ID of the window to be dragged
 * */
function TouchDragWindow(e, windowID) {

    GetWindowToFront(windowID);

    // Get "first" touch position
    var initialTouchXPos = e.touches[0].clientX;
    var initialTouchYPos = e.touches[0].clientY;

    // Get touch offset from current window position
    var touchOffsetX = initialTouchXPos - Number(document.getElementById(windowID).style.left.replace("px", ""));
    var touchOffsetY = initialTouchYPos - Number(document.getElementById(windowID).style.top.replace("px", ""));

    /**
     * The mouse drag main function
     * 
     * @param {TouchEvent} event        Pass the mouse event to this function
     * @param {string}     window_ID    ID of the window to apply the mouse event to
     * */
    var touchDragWindow_mainFunction = function (event, window_ID) {
        event.preventDefault();

        if (document.getElementById(windowID).style.width == "100%" || document.getElementById(windowID).style.height == "100%") {
            MaximizeWindow_Click(windowID);
        }

        // Get cursor position
        var x = event.touches[0].clientX;
        var y = event.touches[0].clientY;

        var window = document.getElementById(window_ID);
        if (x > 0) {
            window.style.left = (x - touchOffsetX) + "px";
        }

        if (y > 0) {
            window.style.top = (y - touchOffsetY) + "px";
        }
    }

    var touchDragWindow_drag = function (event) {
        touchDragWindow_mainFunction(event, windowID);
    }

    document.addEventListener("touchend", function () {
        document.removeEventListener("touchmove", touchDragWindow_drag);
    });

    document.addEventListener("touchmove", touchDragWindow_drag);
}

// #region About Me

function pnlAboutMeWorker() {

    // Download window information
    var windowData = ConvertJSON(XHRDownloader("/api/AboutMe/GetContent/" + selectedLanguage));

    console.log(windowData);

    // Create window
    var application = new Application(new WindowType().Type.Single, windowData["windowTitle"], "pnlWindowNewAboutMe");
    application.WindowProperties.WindowControlsOption.EnableMaximize = false;
    application.WindowProperties.WindowControlsOption.EnableMinimize = false;
    application.WindowProperties.WindowSize = new WindowSize("500px", "434px");

    document.getElementById("pnlDesktopWorkArea").appendChild(application.Render());

    var guid = GetGUID("pnlWindowNewAboutMe");

    // Build window content

    // Header container
    var headerContainer = document.createElement("header");
    headerContainer.classList.add("w3-bar");
    headerContainer.classList.add("w3-block");
    headerContainer.classList.add("w3-container");
    headerContainer.classList.add("w3-margin-top");
    headerContainer.style.padding = "0px 0px 0px 0px";

    // Header icon
    var headerIcon = document.createElement("div");
    headerIcon.id = "pnlAboutMePicture";
    headerIcon.classList.add("w3-bar-item");
    headerIcon.classList.add("w3-center");
    headerIcon.classList.add("desktopBackgroundImage");
    headerIcon.classList.add("w3-hide-small");
    headerIcon.style.width = "80px";
    headerIcon.style.height = "80px";
    headerIcon.style.backgroundImage = "url('" + windowData["headerIcon"] + "')";

    headerContainer.appendChild(headerIcon);

    // Header text
    var headerTitle = document.createElement("span");
    headerTitle.classList.add("w3-bar-item");
    headerTitle.innerText = windowData["headerTitle"];
    headerTitle.style.fontSize = "40px";

    headerContainer.appendChild(headerTitle);

    document.getElementById("pnlContentWindow_" + guid).appendChild(headerContainer);

    // Information detail container
    var detailContainer = document.createElement("div");
    detailContainer.classList.add("w3-margin-top");

    document.getElementById("pnlContentWindow_" + guid).appendChild(detailContainer);

    // Occupation
    var detailOccpation = document.createElement("div");
    detailOccpation.innerHTML = "<i class=\"la la-briefcase\"></i> " + windowData["occupationValue"];
    detailContainer.appendChild(detailOccpation);

    // Address
    var detailAddress = document.createElement("div");
    detailAddress.innerHTML = "<i class=\"la la-home\"></i> " + windowData["addressValue"];
    detailContainer.appendChild(detailAddress);

    // Email
    var detailEmail = document.createElement("div");
    detailEmail.innerHTML = "<i class=\"la la-envelope\"></i> " + windowData["emailValue"];
    detailContainer.appendChild(detailEmail);

    // Load skills
    var skills = ConvertJSON(XHRDownloader("/api/AboutMe/GetSkills"));
    console.log(skills);

    // Skill header title container
    var skillHeaderTitleContainer = document.createElement("div");
    skillHeaderTitleContainer.innerHTML = "<p>" + windowData["skillTitle"] + "</p>";

    detailContainer.appendChild(skillHeaderTitleContainer);

    // Skills container
    var skillContainer = document.createElement("div");
    skillContainer.classList.add("w3-row");
    skillContainer.style.overflowY = "scroll";
    skillContainer.style.height = "175px";

    document.getElementById("pnlContentWindow_" + guid).appendChild(skillContainer);

    // Create skill items
    for (var i = 0; i < skills.length; i++) {
        // Skill item container
        var skillItemContainer = document.createElement("div");
        skillItemContainer.classList.add("w3-third");
        skillItemContainer.classList.add("w3-padding-small");

        // Skill display container
        var skillDisplayContainer = document.createElement("div");
        skillDisplayContainer.classList.add("w3-display-container");
        skillDisplayContainer.classList.add("w3-block");
        skillDisplayContainer.classList.add("w3-round");
        skillDisplayContainer.classList.add("w3-border");
        skillDisplayContainer.style.height = "70px";

        skillItemContainer.appendChild(skillDisplayContainer);

        // Skill item
        var skillItem = document.createElement("span");
        skillItem.classList.add("w3-display-middle");
        skillItem.classList.add("w3-center");
        skillItem.innerText = skills[i].name;
        skillDisplayContainer.appendChild(skillItem);

        skillContainer.appendChild(skillItemContainer);
    }

    // Hide window scroll element
    document.getElementById("pnlContentWindow_" + guid).style.overflowY = "hidden";
    document.getElementById("pnlWindowNewAboutMe").style.left = "0px";
    document.getElementById("pnlWindowNewAboutMe").style.top = "0px";
} 

// #endregion About Me

// #region First-Time Setup

/**
 * Function that handles things for the window "First Time Setup"
 * */
function pnlWindowFirstTimeSetupWorker() {
    if (selectedLanguage == "" || selectedLanguage == null) return; // Prevent execution if selected language not set

    var application = new Application(new WindowType().Type.Single, "Welcome", "pnlWindowNewFirstTimeSetup");
    application.WindowProperties.WindowSize = new WindowSize("400px", "300px");
    document.getElementById("pnlDesktopWorkArea").appendChild(application.Render());

    // Get guid of the newly created window
    var guid = GetGUID("pnlWindowNewFirstTimeSetup");

    // Clear panel
    document.getElementById("pnlContentWindow_" + guid).innerHTML = XHRDownloader("/" + selectedLanguage + "/Welcome/LoadData");
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

    if (document.getElementById("pnlWindowSettings").dataset.guid == null) {
        // Addapt the window to mimic the new window
        document.getElementById("pnlWindowSettings").setAttribute("data-guid", crypto.randomUUID());
        document.getElementById("pnlTitleBarContainer_SettingsHeader").id = "pnlTitleBarContainer_" + GetGUID("pnlWindowSettings");

        document.getElementById("pnlTitleBarContainer_" + GetGUID("pnlWindowSettings")).addEventListener("mousedown", function (event) {
            DragWindow(event, "pnlWindowSettings");
        });
    }

    SettingsWallpaperWorker();
}

// #endregion Settings

// #region Resume

/** Function that handles things for the "Resume" window */
function pnlResumeMenuWorker() {
    if (selectedLanguage == "" || selectedLanguage == null) return; // Prevent execution if selected language not set

    // Generate new application window
    var application = new Application(new WindowType().Type.Normal, "Resume", "pnlWindowNewResume");
    application.WindowProperties.WindowSize = new WindowSize("800px", "600px");
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
    var windowID = "pnlWindowNewWorks";
    var application = new Application(new WindowType().Type.Single, "Works", windowID);
    application.WindowProperties.WindowSize = new WindowSize("500px", "400px");
    application.WindowProperties.WindowControlsOption.EnableMaximize = false;
    application.WindowProperties.CssClass = "w3-bar-block";

    document.getElementById("pnlDesktopWorkArea").appendChild(application.Render());

    var guid = GetGUID(windowID);
    var contentPanel = "pnlContentWindow_" + guid;

    // Get the work list
    var works = ConvertJSON(XHRDownloader("/" + selectedLanguage + "/api/Work/GetWorks"));

    // Clear old list
    //document.getElementById("pnlWorkItemGroup").innerHTML = "";

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
        document.getElementById(contentPanel).appendChild(button);
    }
    // Add more work content
    var moreWorkIcon = "<p>(๑˃ᴗ˂)ﻭ</p>";
    var moreWorkText = "<p>And more works is comming</p>";
    var moreWork = document.createElement("div");
    moreWork.className = "w3-container blockTextSelection w3-center";

    moreWork.innerHTML = moreWorkIcon + moreWorkText;
    document.getElementById(contentPanel).appendChild(moreWork);
}

/**
 * A part of "Works" window that load the content of the selected menu item
 * 
 * @param {string}  id          ID of the selected works
 * @param {string}  workName    Name of the work (for  work detail window)
 * */
function pnlWorkDetailWorker(id, workName = "") {

    var windowID = "pnlWindowNewWorks";
    var windowDetailID = "pnlWorkDetail";
    var workGUID = GetGUID(windowID);
    var workDetailTitle = workName + " - " + document.getElementById("lblWindowTitle_" + workGUID).innerHTML;

    var application = new Application(new WindowType().Type.Single, workDetailTitle, windowDetailID);
    application.WindowProperties.WindowSize = new WindowSize("700px", "500px");
    application.WindowProperties.WindowControlsOption.EnableMinimize = false;
    application.WindowProperties.CssClass = "w3-block";

    document.getElementById("pnlDesktopWorkArea").appendChild(application.Render());

    var guid = GetGUID(windowDetailID);

    // Set window title
    //document.getElementById("lblWindowWorkDetailTitle").innerText = workName + " - " + document.getElementById("lblWindowWorksTitle").innerHTML;

    // Get work details
    document.getElementById("pnlContentWindow_" + guid).innerHTML = XHRDownloader(("/" + selectedLanguage + "/api/Work/GetWorkDetail/" + id));
    //document.getElementById("pnlWorkDetailWindow").innerHTML = XHRDownloader(("/api/Work/GetWorkDetail/" + id + "/" + selectedLanguage));
}

/**
 * A part of "Works" window that handles what happen if a work is clicked
 * 
 * @param {string}  id      ID of the work
 * @param {string}  string  Name of the work
 */
function btnWork_Click(id, workName) {
    //GetWindowToFront("pnlWindowWorkDetails");

    // Get details
    pnlWorkDetailWorker(id, workName);
}

// #endregion Works

// #region Changelog

/** A part of "Changelog" window that handles history of application development */
function pnlChangelogMenuWorker() {
    if (selectedLanguage == "" || selectedLanguage == null) return; // Prevent execution if selected language not set

    var application = new Application(new WindowType().Type.Normal, "Changelog", "pnlWindowNewChangelog");
    application.WindowProperties.WindowSize = new WindowSize("600px", "400px");

    document.getElementById("pnlDesktopWorkArea").appendChild(application.Render());

    var guid = GetGUID("pnlWindowNewChangelog");


    // Get list
    var changelogList = ConvertJSON(XHRDownloader("/api/Changelog/LoadMenu/"));

    // Clear old list

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

        document.getElementById("pnlSidebarContentWindow_" + guid).appendChild(button);
    }
}

/**
 * A part of "Changelog" that handles what happen if a changelog item is clicked
 * 
 * @param {string} id ID of the changelog item
 * */
function btnChangelog_Click(id) {
    if (selectedLanguage == "" || selectedLanguage == null) return; // Prevent execution if selected language not set

    var guid = GetGUID("pnlWindowNewChangelog");

    document.getElementById("pnlContentWindow_" + guid).innerHTML = XHRDownloader("/" + selectedLanguage + "/api/Changelog/LoadData/" + id);
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

function addNotification(err, url, line) {
    var notification = document.createElement("div");
    var guid = crypto.randomUUID();
    notification.id = "pnlNotification_" + guid;
    notification.classList.add("w3-bar-item");
    notification.classList.add("w3-border-bottom");

    var notificationHeader = document.createElement("header");

    var notificationTitle = document.createElement("div");
    notificationTitle.innerHTML = "<i class=\"la la-bug\"></i> Exception";
    notificationHeader.appendChild(notificationTitle);

    notification.appendChild(notificationHeader);

    var notificationBody = document.createElement("div");
    notificationBody.innerHTML(err);

    notification.appendChild(notificationBody);

    document.getElementById("pnlNotificationList").appendChild(notification);
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
    welcomeButtonIcon.id = "btnTaskbar_pnlWindowNewFirstTimeSetup";
    welcomeButtonIcon.classList.add("w3-bar-item");
    welcomeButtonIcon.classList.add("w3-button");
    welcomeButtonIcon.classList.add("w3-transparent");
    welcomeButtonIcon.classList.add("w3-hover-dark-grey");
    welcomeButtonIcon.classList.add("profilePicture");
    welcomeButtonIcon.classList.add("profilePictureCover");
    welcomeButtonIcon.classList.add("w3-ripple");
    welcomeButtonIcon.style.height = "34px";
    welcomeButtonIcon.setAttribute("onclick", ("TaskbarItem_CLick('pnlWindowNewFirstTimeSetup')"));

    document.getElementById("pnlTaskbarItemGroup").appendChild(welcomeButtonIcon);

    // # region Event handler

    window.addEventListener("resize", InitializationPanelHeightAdjuster);
    window.addEventListener("resize", function () { WindowWorker(); });
    window.onerror = function errorHandler(err, url, linenumber) {
        addNotification(err, url, linenumber);

        console.log("triggered");
    }

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