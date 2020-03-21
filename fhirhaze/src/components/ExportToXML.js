// This function exports json to xml and downloads it. It uses the library 'xml-js'
export default function convert2xml(jsonText,fileName){
    var convert = require('xml-js');
    var json = jsonText;
    var options = {compact:true, ignoreComment:true, spaces: 4};
    var results = convert.json2xml(json, options);
    download(fileName, results);
}

// This function is taken from https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
function download(fileName, text){
    var elem = document.createElement('a');
    elem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    elem.setAttribute('download', fileName);

    elem.style.display = 'none';
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
}
