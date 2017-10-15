const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

module.exports = (app, config) => {

    // Configure middleware for parsing from data.
    app.use(bodyParser.urlencoded({extended: true}));

    // Config public folder
    app.use((req, resp, next) => {

        if (req.url.startsWith('/content')) {
            req.url = req.url.replace('/content', '');
        }

        next();

    }, express.static(path.normalize(path.join(config.rootPath, 'content'))));

    app.set('view engine', 'pug');
    app.set('views', path.join(config.rootPath, 'views'));
};