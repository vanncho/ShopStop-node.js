const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const Category = require('../models/category');
const responses = require('../common/responses');

module.exports = (req, resp) => {

    req.pathname = req.pathname || url.parse(req.parse).pathname;

    if (req.pathname === '/category/add' && req.method === 'GET') {

        let filePath = path.normalize(path.join(__dirname, '../views/category/add.html'));

        fs.readFile(filePath, (err, data) => {

           if (err) {
               console.log(err);
               return;
           }

           responses.ok(resp);

           resp.write(data);
           resp.end();
        });
    } else if (req.pathname === '/category/add' && req.method === 'POST') {

        let queryData = '';

        req.on('data', (data) => {

           queryData += data;
        });

        req.on('end', () => {

            let category = qs.parse(queryData);
            Category.create(category).then(() => {

                responses.redirect(resp);

                resp.end();
            }).catch(console.log());
        });
    } else {
        return true;
    }
};