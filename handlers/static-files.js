const fs = require('fs');
const path = require('path');
const url = require('url');
const responses = require('../common/responses');

function getContentType(url) {

    let lastDotIndex = url.lastIndexOf('.');
    url = url.substring(lastDotIndex);

    let contentTypes = {
        ".css": "text/css",
        ".js": "application/javascript",
        ".ico": "image/x-icon",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg"
    };

    return contentTypes[url];
}

module.exports = (req, resp) => {

    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname.startsWith('/content/') && req.method === 'GET') {

        let filePath = path.normalize(path.join(__dirname, `..${req.pathname}`));

        fs.readFile(filePath, (err, data) => {

            if (err) {
                console.log(err);

                responses.notFound(resp);
                resp.end();
                return;
            }

            let contentType = getContentType(req.pathname);
            responses.ok(resp, contentType);

            resp.write(data);
            resp.end();
        });
    } else {
        return true;
    }
};