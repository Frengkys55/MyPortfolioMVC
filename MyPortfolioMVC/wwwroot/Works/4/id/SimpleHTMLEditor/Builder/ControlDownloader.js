import { XHRDownloader, ConvertJSON } from "../Downloader/XHRDownloader.js";
import { SimpleHTMLEditorConfig } from "../Config.js";

/**
* Download control from the web
* 
* @param    {string}                    control Control JSON file name (eg. AddImage.json)
 * @param   {SimpleHTMLEditorConfig}    config  Application configuration object
*/
export function ControlDownloader(control, config) {
    //console.log(config.ControlLocation);
    var downloadAddress = "./SimpleHTMLEditor/Controls/" + control;
    return ConvertJSON(XHRDownloader(downloadAddress));
}