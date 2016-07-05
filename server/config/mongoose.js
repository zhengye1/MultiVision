'use strict';


var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function(config){
    mongoose.connect(config.db);


    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback(){
        console.log('multivision db connected');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        salt: String,
        hashed_pwd: String,
        roles: [String]
    });

    userSchema.methods = {
        authenticate: function(passwordToMatch){
            return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    };
    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection){
        if(collection.length === 0){
            var salt, hash;
            salt = createSalt();
            hash = hashPwd(salt, 'Yukirin');
            User.create({firstName: 'Vincent', lastName:'Zheng', username:'zhengye1',
                salt: salt, hashed_pwd: hash, roles:['admin']});
            salt = createSalt();
            hash = hashPwd(salt, 'alice0102');
            User.create({firstName: 'Alice', lastName:'Lin', username:'linyichen',
                salt: salt, hashed_pwd: hash});
            salt = createSalt();
            hash = hashPwd(salt, 'Yuki715');
            User.create({firstName: 'Yuki', lastName:'Kashiwagi', username:'kashiwakiyuki',
                salt: salt, hashed_pwd: hash, roles:[] });
        }
    })
};

function createSalt(){
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd){
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}