const url = require('url');
const database = require('../config/database');
const fs = require('fs');
const path = require('path');
const multiparty = require('multiparty');
const shortid = require('shortid');

module.exports = (req, resp) => {

    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname === '/product/add' && req.method === 'GET') {

        let filePath = path.normalize(path.join(__dirname, '../views/products/add.html'));

        fs.readFile(filePath, (err, data) => {

            if (err) {
                console.log(err);
            }

            resp.writeHead(200, {
                'Content-Type': 'text/html'
            });

            resp.write(data);
            resp.end();
        });
    } else if (req.pathname === '/product/add' && req.method === 'POST') {

        let form = new multiparty.Form();
        let product = {};

        form.parse(req, function(err, fields, files) {

            product.name = fields.name[0];
            product.description = fields.description[0];
            product.price = fields.price[0];

            let fileName = shortid.generate();
            let filePath = path.normalize(path.join(__dirname, `../content/images/${fileName}`));
            product.image = `../content/images/${fileName}.${(files.image[0].path).substr(-3)}`;

            fs.readFile(files.image[0].path, (err, data) => {

                if (err) {
                    console.log(err);
                }

                fs.writeFile(`${filePath}.${(files.image[0].path).substr(-3)}`, data, {encoding: 'ascii'}, (err) => {

                    if (err) {
                        console.log(err);
                        return;
                    }
                });
            });

            database.products.add(product);

            resp.writeHead(302, {
                        Location: '/'
                    });

            resp.end();
        });
    } else {
        return true;
    }
};