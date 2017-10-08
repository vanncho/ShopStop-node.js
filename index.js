const http = require('http');
const port = 3000;
const handlers = require('./handlers/index');

http.createServer((req, resp) => {

    for (let handler of handlers) {
        if (!handler(req, resp)) {
            break;
        }
    }

}).listen(port);