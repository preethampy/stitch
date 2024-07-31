const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required!"],
        unique: [true, "Username already exists"]
    },
    password: {
        type: String,
        required: [true, "Password is required!"]
    },
    favorites:[mongoose.Types.ObjectId],
    jwt:String

});

schema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });

});


schema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model("users", schema)