var mongoose = require("mongoose");

var LocationSchema = mongoose.Schema({
    latitude: String,
    longitude: String
});

module.exports = mongoose.model('Location', LocationSchema);