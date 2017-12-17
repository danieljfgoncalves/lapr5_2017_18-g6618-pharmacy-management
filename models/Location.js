// models/Location.js

var mongoose = require("mongoose");

var LocationSchema = mongoose.Schema({
    latitude: String,
    longitude: String
});

module.exports.schema = LocationSchema;
module.exports.model = mongoose.model('Location', LocationSchema);