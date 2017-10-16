const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = (config) => {

    mongoose.connect(config.connectionString, {
        useMongoClient: true
    });

    let database = mongoose.connection;

    database.on('error', (err) => {

        if (err) {
            console.log(err);
            return;
        }
    });

    database.once('open', (err) => {

       if (err) {
           console.log(err);
           return;
       }

        console.log('Connected to database!');
    });

    require('../models/product');
    require('../models/category');
    require('../models/user').seedAdminUser();
};