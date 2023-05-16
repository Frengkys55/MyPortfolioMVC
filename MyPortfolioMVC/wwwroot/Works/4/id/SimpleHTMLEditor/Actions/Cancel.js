
/**
 * Close Close (more like remove) specified panel (and its child nodes)
 * 
 * @param {string}  panel Specific panel ID to close/remove
 */
export function Cancel_Click(panel) {
    try {
        document.getElementById(panel).remove();
    } catch (e) {
        console.error("Fail to close window. " + e);
    }
}