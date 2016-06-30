'use strict';

var express = require('express'),
    stylus = require('stylus'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    path = require('path');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
    return stylus(str).set('filename', path);
};


app.set('views', __dirname  + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(stylus.middleware({
        src: __dirname + '/public',
        compile: compile
    }
));

app.use(express.static(__dirname  + '/server/views'));


app.get('*', function(req, res){
    res.render('index');
});

app.get('/partials/:partialPath', function(req, res){
    res.render('/partials/' + req.param.partialPath);
});

var port = 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');