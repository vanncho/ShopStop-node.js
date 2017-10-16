const controllers = require('../controllers/index');
const multer = require('multer');
const auth = require('./auth');

let upload = multer({dest: './content/images'});

module.exports = (app) => {

    app.get('/', controllers.home.index);

    // ADD PRODUCT
    // app.get('/product/add', auth.isInRole('Admin'), controllers.product.addGet);
    // app.post('/product/add', auth.isInRole('Admin'), upload.single('image'), controllers.product.addPost);
    app.get('/product/add', auth.isAuthenticated, controllers.product.addGet);
    app.post('/product/add', auth.isAuthenticated, upload.single('image'), controllers.product.addPost);

    // ADD CATEGORY
    app.get('/category/add', controllers.category.addGet);
    app.post('/category/add', controllers.category.addPost);

    app.get('/category/:category/products', controllers.category.productByCategory);

    // EDIT PRODUCT
    app.get('/product/edit/:id', controllers.product.editGet);
    app.post('/product/edit/:id', upload.single('image'), controllers.product.editPost);

    // DELETE PRODUCT
    app.get('/product/delete/:id', controllers.product.deleteGet);
    app.post('/product/delete/:id', controllers.product.deletePost);

    // BUY PRODUCT
    app.get('/product/buy/:id', controllers.product.buyGet);
    app.post('/product/buy/:id', controllers.product.buyPost);

    // USER REGISTER
    app.get('/user/register', controllers.user.registerGet);
    app.post('/user/register', controllers.user.registerPost);

    // USER LOGIN
    app.get('/user/login', controllers.user.loginGet);
    app.post('/user/login', controllers.user.loginPost);
};