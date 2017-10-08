const url = require('url');
const fs = require('fs');
const path = require('path');
const multiparty = require('multiparty');
const shortId = require('shortid');
const Product = require('../models/product');
const Category = require('../models/category');
const responses = require('../common/responses');

module.exports = (req, resp) => {

    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname === '/product/add' && req.method === 'GET') {

        let filePath = path.normalize(path.join(__dirname, '../views/products/add.html'));

        fs.readFile(filePath, (err, data) => {

            if (err) {
                console.log(err);
            }

            Category.find().then((categories) => {

                let replacement = '<select class="input-field" name="category">';
                replacement += '<option></option>';

                for (let category of categories) {

                    replacement += `<option value="${category._id}">${category.name}</option>`;
                }

                replacement += '</select>';

                let html = data.toString().replace('{categories}', replacement);

                responses.ok(resp);

                resp.write(html);
                resp.end();
            });
        });
    } else if (req.pathname === '/product/add' && req.method === 'POST') {

        let form = new multiparty.Form();
        let productFromForm = {};

        form.parse(req, function (err, fields, files) {

            productFromForm.name = fields.name[0];
            productFromForm.description = fields.description[0];
            productFromForm.price = fields.price[0];
            productFromForm.category = fields.category[0];

            let fileName = shortId.generate();
            let filePath = path.normalize(path.join(__dirname, `../content/images/${fileName}`));
            productFromForm.image = `../content/images/${fileName}.${(files.image[0].path).substr(-3)}`;

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

            Product.create(productFromForm).then((insertedProduct) => {

                Category.findById(productFromForm.category).then(category => {

                   category.products.push(insertedProduct._id);
                   category.save();

                });

                responses.redirect(resp);

                resp.end();

            }).catch(console.log);

        });
    } else {
        return true;
    }
};