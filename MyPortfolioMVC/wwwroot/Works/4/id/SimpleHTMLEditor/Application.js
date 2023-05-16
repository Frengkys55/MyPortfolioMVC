import * as SimpleHTMLEditorConfig from "../SimpleHTMLEditor/Config.js";
import * as LayoutBuilder from "../SimpleHTMLEditor/Builder/LayoutBuilder.js";

/**
 * Main entry class for simple HTML Editor
 */
export class SimpleHTMLEditor {
    
    /**
     * Main entry class for simple HTML Editor
     * 
     * @param {SimpleHTMLEditorConfig.SimpleHTMLEditorConfig} config Configuration for SimpleHTMLEditor
     */
    constructor(config) {

        this.Config = config;
    }

    /**
     * Program main entry point
     */
    Run() {
        this.Initialize();
        this.Render();
    }

    /**
     * Program initialization
     */
    Initialize() {
        document.getElementById(this.Config.WorkPanel).style.overflowY = "hidden";
        document.getElementById(this.Config.WorkPanel).style.overflowX = "hidden";
    }

    /**
     * A function to put all the controls to the page 
     */
    Render() {
        var layout = new LayoutBuilder.LayoutBuilder(this.Config);

        document.getElementById(this.Config.WorkPanel).appendChild(layout);
    }
}