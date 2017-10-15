const homeHandler = require('./home');
const productHandler = require('./product');
const categoryHandler = require('./category');

const handlers = {

    home: homeHandler,
    product: productHandler,
    category: categoryHandler
};

module.exports = handlers;