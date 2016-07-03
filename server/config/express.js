'use strict';
var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    passport = require('passport'),
    cookieParer = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser');

module.exports = function(app, config) {
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');
    app.use(logger('dev'));
    app.use(cookieParer());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(session({resave: true,
        saveUninitialized: true,
        secret: 'multi vision unicorns'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public',
            compile: compile
        }
    ));
    app.use(express.static(config.rootPath + '/public'));
}