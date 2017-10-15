const handlers = require('../handlers/index');
const multer = require('multer');

let upload = multer({dest: './content/images'});

module.exports = (app) => {

    app.get('/', handlers.home.index);

    // ADD PRODUCT
    app.get('/product/add', handlers.product.addGet);
    app.post('/product/add', upload.single('image'), handlers.product.addPost);

    // ADD CATEGORY
    app.get('/category/add', handlers.category.addGet);
    app.post('/category/add', handlers.category.addPost);

    app.get('/category/:category/products', handlers.category.productByCategory);

    // EDIT PRODUCT
    app.get('/product/edit/:id', handlers.product.editGet);
    app.post('/product/edit/:id', upload.single('image'), handlers.product.editPost);

    // DELETE PRODUCT
    app.get('/product/delete/:id', handlers.product.deleteGet);
    app.post('/product/delete/:id', handlers.product.deletePost);

    // BUY PRODUCT
    app.get('/product/buy/:id', handlers.product.buyGet);
};