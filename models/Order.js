// models/Order.js

var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;
var ActivityLog = require('./ActivityLog').schema;
var LocationSchema = require('./Location').schema;

var OrderSchema = ActivityLog.extend({
    qttNeeded: {
        type: Number, min: 1
    },
    period_day: String,
    presentation: {type: mongoose.Schema.Types.ObjectId,  ref:'Presentation', required: true},
    location: {type: LocationSchema,  ref:'Location', required: true},    
});

OrderSchema.path('presentation').validate(presentation => {
    if(!presentation) {return false;}
    return true;
}, 'The order must have one presentation.');

OrderSchema.path('location').validate(location => {
    if(!location) {return false;}
    return true;
}, 'The order must have one location.');

OrderSchema.path('qttNeeded').validate(qttNeeded => {
    if(qttNeeded <= 0) {return false;}
    return true;
}, 'The order must have one quantity needed plus then 0.');

module.exports = mongoose.model('Order', OrderSchema);