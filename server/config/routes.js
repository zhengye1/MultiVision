'use strict';
var auth = require('./auth');
module.exports = function(app){
    app.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.get('/api', function(req, res){
        res.status(200).send("<h1>This is API page</h1>")
    });

    app.post('/login', auth.authenticate);

    app.get('*', function(req, res) {
        res.render('index')
    });
};