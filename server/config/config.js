'use strict';
var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
module.exports ={
    development: {
        db: 'mongodb://localhost:27017/multivision',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    production: {
        db: 'mongodb://zhengye1:Yukirin0715@ds011715.mlab.com:11715/heroku_lxsrj2t3',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
};
