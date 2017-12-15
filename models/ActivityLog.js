// models/ActivityLog.js

var mongoose = require("mongoose"),
    extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;

var ActivityLogSchema = new Schema({
    date: Date
},
    {
        collection : 'log',
        discriminatorKey : '_type'
    }
);

module.exports.schema = ActivityLogSchema;
module.exports.model = mongoose.model('ActivityLog', ActivityLogSchema);