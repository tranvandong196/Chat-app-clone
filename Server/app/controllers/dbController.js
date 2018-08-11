var mongoose = require('mongoose');
var config = require('../configs/config');
exports.connectMongoDb = function() {
    //connect to MongoDB
    var mongodbUri = config.dbUri;
    var options = {
        useNewUrlParser: true
    };
    mongoose.connect(mongodbUri, options, function (err, result) {
        if (err) {
            console.log('Mongoose Connect ERROR: ', err.message);
        } else {
            console.log('Mongoose connected');
        }

    });
};