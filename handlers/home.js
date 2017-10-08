const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const Product = require('../models/product');

module.exports = (req, resp) => {

    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname === '/' && req.method === 'GET') {

        let filePath = path.normalize(path.join(__dirname, '../views/home/index.html'));

        fs.readFile(filePath, (err, data) => {

            if (err) {
                console.log(err);
                resp.writeHead(404, {
                    'Content-Type': 'text/html'
                });

                resp.write('404 Not Found!');
                resp.end();
                return;
            }

            resp.writeHead(200, {
                'Content-Type': 'text/html'
            });

            let queryData = qs.parse(url.parse(req.url).query);

            Product.find().then((products) => {

                if (queryData.query) {
                    products = products.filter(p => p.name.toLowerCase().includes(queryData.query));
                }

                let content = '';

                for (let product of products) {

                    content +=
                        `<div class="product-card">
                        <img class="product-img" src="${product.image}"
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                    </div>`;
                }

                let html = data.toString().replace('{content}', content);
                resp.write(html);
                resp.end();

            }). catch(console.log());

        });
    } else {
        return true;
    }
};