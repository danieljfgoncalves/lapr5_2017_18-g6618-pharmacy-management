// models/Order.js

var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;
var ActivityLog = require('./ActivityLog').schema;
var LocationSchema = require('./Location').schema;
var MedicinePresentationSchema = require('./Presentation');

var OrderSchema = ActivityLog.extend({
    qttNeeded: {
        type: Number, min: 1
    },
    period_day: String,
    medicinePresentation: {type: MedicinePresentationSchema,  ref:'MedicinePresentation', required: true},
    location: {type: LocationSchema,  ref:'Location', required: true},    
});

OrderSchema.path('medicinePresentation').validate(presentation => {
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