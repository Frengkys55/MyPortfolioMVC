/**
 * Content downloader
 * 
 * @param   {string} uri    [Content url to download]
 * @returns {object}        [Return downloaded content]
 */
export function XHRDownloader(uri) {
    var xhrResponse = {};

    var xhr = new XMLHttpRequest();

    xhr.open("GET", uri, false);
    xhr.onload = function () {
        if (xhr.status === 200) {
            xhrResponse = xhr.response;
        }
    }

    xhr.send(null);

    return xhrResponse;
}

/**
 * Convert JSON string to a JSON object
 * 
 * @param   {string}    object  JSON string to convert
 * @returns {JSON}              JSON object
 */
export function ConvertJSON(object) {
    return JSON.parse(object);
}