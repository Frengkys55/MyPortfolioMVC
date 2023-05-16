import { ControlAvailabilityReader } from "../Builder/ControlAvailableChecker.js";
import { ControlBuilder } from "../Builder/ControlBuilder.js";
import { SimpleHTMLEditorConfig } from "../../SimpleHTMLEditor/Config.js";

/**
* A function to create layout for the editor
* 
* @param    {SimpleHTMLEditorConfig}    Config  Config
* @returns  {HTMLElement}                       Returns editor layout
*/
export function LayoutBuilder(Config) {
    var availableControls = [];

    // Main editor layout
    var layout = document.createElement("div");
    layout.style.height = "100%";
    layout.classList.add("w3-display-container");

    // Toolbar
    var toolbar = document.createElement("div");
    toolbar.id = "pnlEditorToolbar_" + Config.WorkPanel;
    toolbar.classList.add("w3-bar");
    toolbar.classList.add("w3-block");
    toolbar.classList.add("w3-block");
    toolbar.classList.add("w3-black");
    toolbar.classList.add("w3-card");
    toolbar.style.zIndex = 99;
    toolbar.style.position = "absolute";
    toolbar.style.top = "0";
    layout.appendChild(toolbar);

    // Get available controls
    try {
        availableControls = ControlAvailabilityReader(Config.CheckAddress);
        // Check for problem
        if (availableControls == undefined) {
            throw new DOMException("availableControl is undefined");
        }

        if (availableControls == null) {
            throw new DOMException("availableControl is undefined");
        }

        if (availableControls.length == 0) {
            throw new DOMException("No control availbale");
        }

        // Create toolbar control
        for (var i = 0; i < availableControls.length; i++) {
            toolbar.appendChild(ControlBuilder(availableControls[i], Config.WorkPanel));
        }

    } catch (e) {
        console.error("There is a problem processing request. " + e.stack);

        // Return no control label
        var noControl = document.createElement("label");
        noControl.classList.add("w3-bar-item");
        noControl.innerText = "Fail to load controls";
        toolbar.appendChild(noControl);
    }

    // Content
    var contentPanelContainer = document.createElement("div");
    contentPanelContainer.id = "pnlEditorContent_" + Config.WorkPanel;
    contentPanelContainer.classList.add("w3-display-bottomleft");
    contentPanelContainer.classList.add("w3-container");
    contentPanelContainer.classList.add("w3-block");
    contentPanelContainer.style.overflowY = "scroll";
    contentPanelContainer.style.overflowX = "hidden";
    contentPanelContainer.style.backgroundColor = "#ffffffc0";
    contentPanelContainer.style.backdropFilter = "blur(10px)";
    contentPanelContainer.style.height = "100%";
    contentPanelContainer.style.paddingTop = "38.5px";

    layout.appendChild(contentPanelContainer);

    // Append to panel
    return layout;
}