// models/Location.js

var mongoose = require("mongoose");

var LocationSchema = mongoose.Schema({
    latitude: { 
        type: String,
        required: true
    },
    longitude: { 
        type: String,
        required: true
    }
});

module.exports.schema = LocationSchema;
module.exports.model = mongoose.model('Location', LocationSchema);