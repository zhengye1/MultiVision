'use strict';
var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');


var userSchema = mongoose.Schema({
    firstName: {type: String, required: '{PATH} is required!'},
    lastName: {type: String, required: '{PATH} is required!'},
    username: {
        type: String,
        required: '{PATH} is required!',
        unique: true
    },
    salt: {type: String, required: '{PATH} is required!'},
    hashed_pwd: {type: String, required: '{PATH} is required!'},
    roles: [String]
});

userSchema.methods = {
    authenticate: function(passwordToMatch){
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
};
var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'Yukirin');
            User.create({
                firstName: 'Vincent', lastName: 'Zheng', username: 'zhengye1',
                salt: salt, hashed_pwd: hash, roles: ['admin']
            });
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'alice0102');
            User.create({
                firstName: 'Alice', lastName: 'Lin', username: 'linyichen',
                salt: salt, hashed_pwd: hash
            });
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'Yuki715');
            User.create({
                firstName: 'Yuki', lastName: 'Kashiwagi', username: 'kashiwakiyuki',
                salt: salt, hashed_pwd: hash, roles: []
            });
        }
    })
};

exports.createDefaultUsers = createDefaultUsers;