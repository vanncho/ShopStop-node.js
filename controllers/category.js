const Category = require('../models/category');

module.exports.addGet = (req, resp) => {

    resp.render('category/add');
};

module.exports.addPost = (req, resp) => {

    let category = req.body;
    category.creator = req.user._id;

    Category.create(category).then(() => {

        resp.redirect('/');
    });
};

module.exports.productByCategory = (req, resp) => {

    let categoryName = req.params.category;

    Category.findOne({name: categoryName}).populate('products').then((category) => {

        if (!category) {
            resp.sendStatus(404);
            return;
        }

        resp.render('category/products', {category: category});
    });
};