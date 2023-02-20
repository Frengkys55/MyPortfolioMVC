var jsonData;

function XHRDownloader(uri) {
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

function ConvertJSON(object) {
    return JSON.parse(object);
}