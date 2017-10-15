const fs = require('fs');
const path = require('path');
const Product = require('../models/product');
const Category = require('../models/category');
const responses = require('../common/responses');

module.exports.addGet = (req, resp) => {

    Category.find().then((categories) => {

        resp.render('products/add', {categories: categories});
    });
};

module.exports.addPost = (req, resp) => {

    let productFromForm = req.body;
    productFromForm.image = '/' + req.file.path;

    Product.create(productFromForm).then((insertedProduct) => {

        Category.findById(productFromForm.category).then(category => {

            category.products.push(insertedProduct._id);
            category.save();

        });

        responses.redirect(resp);
        resp.end();

    }).catch(console.log);
};

module.exports.editGet = (req, resp) => {

    let id = req.params.id;

    Product.findOne(id).then(product => {

        if (!product) {
            resp.sendStatus(404);
            return;
        }

        Category.find().then((categories) => {

            resp.render('products/edit', {product: product, categories: categories});
        });
    });
};

module.exports.editPost = (req, resp) => {

    let id = req.params.id;
    let editedProduct = req.body;

    Product.findById(id).then((product) => {

        if (!product) {
            resp.redirect(`/?error=${encodeURIComponent('error=Product was not found!')}`);
            return;
        }

        product.name = editedProduct.name;
        product.description = editedProduct.description;
        product.price = editedProduct.price;

        if (req.file) {
            product.image = '/' + req.file.path;
        }

        if (product.category.toString() !== editedProduct.category) {

            Category.findById(product.category).then((currentCategory) => {

                Category.findById(editedProduct.category).then((nextCategory) => {

                    let index = currentCategory.products.indexOf(product._id);

                    if (index >= 0) {

                        currentCategory.products.splice(index, 1);
                    }

                    currentCategory.save();

                    nextCategory.products.push(product._id);
                    nextCategory.save();

                    product.category = editedProduct.category;

                    product.save().then(() => {

                        resp.redirect('/?success=' + encodeURIComponent('Product was edited successfully!'));
                    });
                });
            });
        } else {

            product.save().then(() => {

                resp.redirect('/?success=' + encodeURIComponent('Product was edited successfully!'));
            });
        }
    });
};

module.exports.deleteGet = (req, res) => {

    let id = req.params.id;

    Product.findById(id).then((product) => {

        if (!product) {
            res.sendStatus(404);
            return;
        }

        res.render('products/delete', {product: product});

    }).catch((err) => {

        console.log(err);
        return;
    });
};

module.exports.deletePost = (req, res) => {

    let id = req.params.id;

    Product.findByIdAndRemove(id).then((product) => {

        if (!product) {

            res.redirect(`/?error=${encodeURIComponent('Product was not found!')}`);
            return;
        }

        fs.unlink(path.normalize(path.join('.', product.image)), () => {

            res.redirect(`/?success= ${encodeURIComponent('Product was deleted successfully!')}`);
        });

    }).catch((err) => {
        console.log(err);
        return;
    });
};

module.exports.buyGet = (req, res) => {

    let id = req.params.id;

    Product.findById(id).then((product) => {

        if (!product) {
            res.sendStatus(404);
            return;
        }

        res.render('products/buy', { product: product });
    });
};