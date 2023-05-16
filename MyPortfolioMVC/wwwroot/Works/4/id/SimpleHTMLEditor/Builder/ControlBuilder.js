import { ControlDownloader } from "../Builder/ControlDownloader.js";
import * as SimpleHTMLEditorActions from "../../SimpleHTMLEditor/Actions.js";
import { GetControl } from "./ControlAvailableChecker.js";
//import { SimpleHTMLEditorConfig } from "../SimpleHTMLEditor/Config.js";

/**
 * Build HTML button based on json data received
 * 
 * @param   {string} control        Name of the control (including extension)
 * @param   {string} workPanel      Name of the panel
 * @returns {HTMLButtonElement}     Return editor control object
 */
export function ControlBuilder(control, workPanel) {

    // Download the rest of the control here

    var controlName = control;
    var controlData = GetControl(control);

    var button = document.createElement("button");
    button.type = "button";
    button.classList.add("w3-button");
    button.classList.add("w3-bar-item");
    button.classList.add("w3-transparent");
    button.classList.add("w3-hover-white");
    button.classList.add("w3-ripple");
    button.title = controlData.Description;

    button.addEventListener("click", function () {
        new SimpleHTMLEditorActions.SimpleHTMLEditorActions().OpenFieldPanel(controlName, workPanel, event);
    });

    var icon = document.createElement("i");
    icon.className = controlData.IconData;
    button.appendChild(icon);

    return button;
}
