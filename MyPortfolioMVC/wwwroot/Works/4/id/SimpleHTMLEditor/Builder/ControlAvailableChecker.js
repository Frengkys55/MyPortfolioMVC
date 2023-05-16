import { XHRDownloader, ConvertJSON } from "../Downloader/XHRDownloader.js";
import { ControlDownloader } from "./ControlDownloader.js";
import { SimpleHTMLEditorConfig } from "../Config.js";

/**
 * List of JSON control
 * 
 * @type    {Array<string>}
 */
var availableControls = [];

/**
 * Control JSON object
 * 
 * @type {Array<string>}
 * */
var controlObjects = [];

/**
* Get a list of control available for the editor in form of JSON array
 * @param   {SimpleHTMLEditorConfig}    config          Editor configuration object 
 * @param   {string}                    checkAddress    Check address
 * 
 * @returns  {Array<string>}                            Returns a list of json file name
*/
export function ControlAvailabilityReader(checkAddress, config) {
    try {
        // Get list of controls
        availableControls = ConvertJSON(XHRDownloader(checkAddress));
        if (availableControls != undefined) {
            // Download control information
            for (var i = 0; i < availableControls.length; i++) {
                controlObjects.push(ControlDownloader(availableControls[i], config));
            }
        }
        else {
            throw new DOMException("No control available");
        }
        return ConvertJSON(XHRDownloader(checkAddress));
    } catch (e) {
        console.error("There is an error processing request. " + e);
    }

    throw new DOMException("Control not available");
}

/**
 * Search and return JSON control object
 * 
 * @param   {string}    control Name of the control (Including extension)
 * @returns {JSON}              Returns JSON object of the specified control name
 */
export function GetControl(control) {
    // Search control in availableControl array
    for (var i = 0; i < availableControls.length; i++) {
        if (availableControls[i] == control) {
            // return JSON object from controlObjects
            return controlObjects[i];
        }
    }
}