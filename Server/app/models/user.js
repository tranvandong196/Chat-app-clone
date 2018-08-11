var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//Define a schema
var UserSchema = new mongoose.Schema({
    username:       { type: String, unique: true, required: true },
    password:       { type: String, required: false,  default: null},
    email:          { type: String, unique: true, required: false },
    conversation:   [],
    remember_token: [],
    created_at:     { type: String, required: true }
}, {
    collection: 'user'
});

// comparePassword
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
};

//Export function to create "UserSchema" model class
module.exports = mongoose.model('User', UserSchema );