const Product = require('../models/product');

module.exports.index = (req, resp) => {

    let queryData = req.query;

    Product.find().populate('category').then((products) => {

        if (queryData.query) {
            products = products.filter(p => p.name.toLowerCase().includes(queryData.query));
        }

        let data = {products: products};

        if (req.query.error) {

            data.error = req.query.error;
        } else {

            data.success = req.query.success;
        }

        resp.render('home/index', data);

    }).catch(console.log);
};