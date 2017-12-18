// models/ActivityLog.js

var mongoose = require("mongoose"),
    extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;

var ActivityLogSchema = new Schema({
    id_pharmacy: {
        type : mongoose.Schema.Types.ObjectId,
        ref:'Pharmacy', 
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
},
    {
        collection : 'log',
        discriminatorKey : '_type'
    }
);

module.exports.schema = ActivityLogSchema;
module.exports.model = mongoose.model('ActivityLog', ActivityLogSchema);