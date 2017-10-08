const fs = require('fs');
const path = require('path');
const url = require('url');

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
                resp.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                resp.write('Resource not found!');
                resp.end();
                return;
            }

            resp.writeHead(200, {
                'Content-Type': getContentType(req.pathname)
            });

            resp.write(data);
            resp.end();
        });
    } else {
        return true;
    }
};