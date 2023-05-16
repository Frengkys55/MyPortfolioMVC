
/**
   * Add content to panel
   * 
   * @param {string}  control     Name of the control triggered this function
   * @param {string}  workPanel   Panel to add the content to
   * @param {string}  controlData Control data containing how to generate contents
   * @param {Array}   args        Input field IDs
   */
export function Save_Click(control, workPanel, controlData, args) {

    try {
        // Get control HTML content
        var content = controlData;

        for (var i = 0; i < args.length; i++) {
            var argToChange = "{arg" + i.toString() + "}";
            var regex = new RegExp(argToChange, "g");

            content = content.replaceAll(regex, document.getElementById(args[i]).value);
        }

        try {
            document.getElementById("pnlEditorContent_" + workPanel).innerHTML += content;
        } catch (e) {
            console.error(e);
        }

        document.getElementById("pnlEditorFieldPanelContainer_" + workPanel + "_" + control).remove(); // Cose panel
    } catch (e) {

    }
}