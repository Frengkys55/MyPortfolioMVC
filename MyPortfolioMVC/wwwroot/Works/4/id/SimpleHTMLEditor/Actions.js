import * as SimpleHTMLEditorActionSave from "../SimpleHTMLEditor/Actions/Save.js";
import * as SimpleHTMLEditorActionCancel from "../SimpleHTMLEditor/Actions/Cancel.js";
import { ControlDownloader } from "../SimpleHTMLEditor/Builder/ControlDownloader.js";

var activeFieldIDs = [];
var activeControl;
var activePanel;

export class SimpleHTMLEditorActions {
    /**
     * Open field panel
     * 
     * @param {string}  control     The name of the control
     * @param {string}  workPanel   The name of the working panel
     */
    OpenFieldPanel(control, workPanel, event) {
        // check field panel
        if (document.getElementById("pnlEditorFieldPanelContainer_" + workPanel + "_" + control) != null) {
            
        }

        this.GenerateFields(control, workPanel);
    }

    /**
     * Dynamic field generation based on received parameter
     * 
     * @param   {Array}     control     Control name array
     * @param   {string}    workPanel   ID of the div where to put the generated fields
     * @returns {void}
     * 
     * */
    GenerateFields(control, workPanel) {
        var tabindex = 0;
        // Reset active field ids
        activeFieldIDs.length = 0;

        var panelFieldName = "pnlEditorFieldPanelContainer_" + workPanel + "_" + control;

        // Check if panel is already open and is the currently pressed button is the currently open one
        if (document.getElementById(panelFieldName) != null || document.getElementById(panelFieldName) != undefined) {
            return;
        }

        // If the currently active field panel is different than the currently processed one,
        // remove and replace the currently active panel with the currently processed panel
        try {
            if (activePanel != panelFieldName) {
                document.getElementById(activePanel).remove();
            }
        } catch (e) {
            console.log(e);
        }

        // Get control info
        var controlInfo = ControlDownloader(control);

        // Field container
        var fieldPanelContainer = document.createElement("div");
        fieldPanelContainer.id = "pnlEditorFieldPanelContainer_" + workPanel + "_" + control;
        fieldPanelContainer.classList.add("w3-black");
        fieldPanelContainer.classList.add("w3-card");
        fieldPanelContainer.classList.add("w3-block");
        fieldPanelContainer.classList.add("w3-animate-opacity");
        //fieldPanelContainer.setAttribute("style", "position:absolute; top: calc (0 + 32px);");

        // Create field panel
        var fieldPanel = document.createElement("div");
        fieldPanel.id = "pnlEditorFieldPanel_" + workPanel;
        fieldPanel.classList.add("w3-container");
        fieldPanel.classList.add("w3-padding-16");

        fieldPanelContainer.appendChild(fieldPanel);

        // Header container
        var labelContainer = document.createElement("div");
        labelContainer.id = "pnlEditorHeaderContainer" + control;
        fieldPanel.append(labelContainer);

        // Header
        var header = document.createElement("h3");
        header.innerText = controlInfo.Name;
        labelContainer.appendChild(header);

        // Input row
        var inputContainer = document.createElement("div");
        inputContainer.id = "pnlEditorInputRow_" + workPanel;
        inputContainer.classList.add("w3-row");
        inputContainer.classList.add("w3-margin-bottom");
        fieldPanel.appendChild(inputContainer);

        // Input column
        var inputColumn = document.createElement("div");
        inputColumn.id = "pnlEditorInputColumn_" + workPanel + "_" + workPanel;
        inputColumn.classList.add("w3-col");
        inputColumn.classList.add("m6");

        inputContainer.appendChild(inputColumn);

        // Input field
        for (var i = 0; i < controlInfo.Fields.length; i++) {

            // Input column
            var textInputRow = document.createElement("div");
            textInputRow.id = "pnlEditorInputLabelCol_" + workPanel + "_" + i.toString();


            inputColumn.appendChild(textInputRow);

            // Input textbox
            var textbox = document.createElement("input");
            textbox.type = "input";
            textbox.id = "txtEditorinput_" + workPanel + "_" + i.toString();
            textbox.classList.add("w3-input");
            textbox.classList.add("w3-text-white");
            textbox.classList.add("w3-transparent");
            textbox.setAttribute("placeholder", controlInfo.Fields[i]);
            textbox.style.whiteSpace = "pre-warp";
            textbox.title = controlInfo.Fields[i];

            textInputRow.appendChild(textbox);

            inputContainer.appendChild(inputColumn);

            activeFieldIDs.push("txtEditorinput_" + workPanel + "_" + i.toString());
        }

        // Preview column
        var previewColumn = document.createElement("div");
        previewColumn.id = "pnlEditorPreviewColumn_" + workPanel + "_";
        previewColumn.classList.add("w3-col");
        previewColumn.classList.add("m6");
        previewColumn.classList.add("w3-red");
        previewColumn.innerHTML = "test";
        //inputContainer.appendChild(previewColumn);

        // Action button container
        var actionButtonContainer = document.createElement("div");
        actionButtonContainer.id = "pnlEditorButtonActionGroup_" + workPanel + "_";
        actionButtonContainer.classList.add("w3-bar");
        actionButtonContainer.classList.add("w3-transparent");

        fieldPanel.appendChild(actionButtonContainer);

        // Action button

        // Preview button
        var actionButtonPreview = document.createElement("button");
        actionButtonPreview.id = "btnEditorActionButtonPreview_" + workPanel;
        actionButtonPreview.classList.add("w3-bar-item");
        actionButtonPreview.classList.add("w3-button");
        actionButtonPreview.classList.add("w3-transparent");
        actionButtonPreview.classList.add("w3-border");
        actionButtonPreview.classList.add("w3-round");
        actionButtonPreview.classList.add("w3-hover-dark-grey");
        actionButtonPreview.classList.add("w3-ripple");
        actionButtonPreview.innerHTML = "<i class=\"la la-eye\"></i>";
        actionButtonPreview.title = "Preview";
        actionButtonPreview.setAttribute("onclick", "SimpleHTMLEditorActions.Preview_Click('" + workPanel + "', '" + controlInfo + "')");

        //actionButtonContainer.appendChild(actionButtonPreview);

        // Add button
        var actionButtonAdd = document.createElement("button");
        actionButtonAdd.id = "btnEditoractionButtonAdd_" + workPanel;
        actionButtonAdd.classList.add("w3-bar-item");
        actionButtonAdd.classList.add("w3-button");
        actionButtonAdd.classList.add("w3-transparent");
        actionButtonAdd.classList.add("w3-border");
        actionButtonAdd.classList.add("w3-round");
        actionButtonAdd.classList.add("w3-hover-dark-grey");
        actionButtonAdd.classList.add("w3-ripple");
        actionButtonAdd.innerHTML = "<i class=\"la la-save\"></i>";
        actionButtonAdd.title = "Add";

        // Combine html array data to string
        var combinedHTML = "";

        for (var i = 0; i < controlInfo.HTML.length; i++) {
            combinedHTML += controlInfo.HTML[i];
        }

        activeControl = controlInfo; // Sets the currently active control

        actionButtonAdd.addEventListener("click", function () {
            console.log("Add button triggered");
            SimpleHTMLEditorActionSave.Save_Click(control, workPanel, combinedHTML, activeFieldIDs);
        });

        actionButtonContainer.appendChild(actionButtonAdd);

        // Cancel button
        var actionButtonCancel = document.createElement("button");
        actionButtonCancel.id = "btnEditorActionButtonCancel_" + workPanel;
        actionButtonCancel.classList.add("w3-bar-item");
        actionButtonCancel.classList.add("w3-button");
        actionButtonCancel.classList.add("w3-transparent");
        actionButtonCancel.classList.add("w3-border");
        actionButtonCancel.classList.add("w3-round");
        actionButtonCancel.classList.add("w3-hover-dark-grey");
        actionButtonCancel.classList.add("w3-margin-left");
        actionButtonCancel.classList.add("w3-ripple");
        actionButtonCancel.innerHTML = "<i class=\"la la-times\"></i>";
        actionButtonCancel.title = "Cancel";
        //actionButtonCancel.setAttribute("onclick", "SimpleHTMLEditorActions.Cancel_Click('" + workPanel + "')");
        actionButtonCancel.addEventListener("click", function () {
            SimpleHTMLEditorActionCancel.Cancel_Click(fieldPanelContainer.id);
        });

        actionButtonContainer.appendChild(actionButtonCancel);

        document.getElementById("pnlEditorToolbar_" + workPanel).appendChild(fieldPanelContainer);
        activePanel = panelFieldName;
    }
}
