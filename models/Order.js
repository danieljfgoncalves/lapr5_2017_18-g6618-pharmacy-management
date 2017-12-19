// models/Order.js

var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;
var ActivityLog = require('./ActivityLog').schema;
var MedicinePresentationSchema = require('./MedicinePresentation');


var OrderSchema = ActivityLog.extend({
    qttNeeded: {
        type: Number, min: 1
    },
    period_day: String,
    medicinePresentation: {
        type: MedicinePresentationSchema,  
        ref:'MedicinePresentation', 
        required: true
    },
    name_pharmacy: String,
    latitude: String,
    longitude: String
});

OrderSchema.path('period_day').validate(period_day => {
    if(!period_day) {return false;}
    return true;
}, 'The order must have one period_day.');

OrderSchema.path('medicinePresentation').validate(medicinePresentation => {
    if(!medicinePresentation) {return false;}
    return true;
}, 'The order must have one medicine Presentation.');

OrderSchema.path('name_pharmacy').validate(name_pharmacy => {
    if(!name_pharmacy) {return false;}
    return true;
}, 'The order must have one name_pharmacy.');

OrderSchema.path('latitude').validate(latitude => {
    if(!latitude) {return false;}
    return true;
}, 'The order must have one latitude.');

OrderSchema.path('longitude').validate(longitude => {
    if(!longitude) {return false;}
    return true;
}, 'The order must have one longitude.');

OrderSchema.path('qttNeeded').validate(qttNeeded => {
    if(qttNeeded <= 0) {return false;}
    return true;
}, 'The order must have one quantity needed plus then 0.');

module.exports = mongoose.model('Order', OrderSchema);