const bcrypt = require('bcrypt');
const saltRounds = 10;

var mongoose = require('mongoose');

var schema = mongoose.Schema;

var users = new schema(
    {
        firstName  : {type:String},
        lastName   : {type:String},
        role       : {type:String},
        phone      : {type:Number},
        email      : {type:String,unique:true},
        password   : {type:String,select:false},
        address    : {type:String},
        profile    : {data:Buffer,contentType:String},
        city       : {type:String},
        state      : {type:String},
        country    : {type:String},
        zip        : {type:Number}
    },
    {collection : "userCollection"}
);

users.pre('save', function(next) {
    var user = this;
        bcrypt.hash(user.password, saltRounds, function(err, hash) {
            if (err){
                return next(err);
            }
            user.password = hash;
            next();
        });
});

users.methods.comparePassword = function(candidatePassword,cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err){
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model("user",users);