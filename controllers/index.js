const homeController = require('./home');
const productController = require('./product');
const categoryController = require('./category');
const userController = require('./user');

const controllers = {

    home: homeController,
    product: productController,
    category: categoryController,
    user: userController
};

module.exports = controllers;