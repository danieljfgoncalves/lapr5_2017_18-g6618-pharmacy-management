// models/Restock.js

var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;
var ActivityLog = require('./ActivityLog').schema;
var MedicinePresentationSchema = require('./MedicinePresentation');

var RestockSchema = ActivityLog.extend({
    quantity: {
        type: Number,
        min: 1
    },
    medicinePresentation: {
        type: MedicinePresentationSchema,  
        ref:'MedicinePresentation', 
        required: true
    },
});

RestockSchema.path('medicinePresentation').validate(medicinePresentation => {
    if(!medicinePresentation) {return false;}
    return true;
}, 'The restock must have one presentation.');

RestockSchema.path('quantity').validate(quantity => {
    if(quantity <= 0) {return false;}
    return true;
}, 'The restock must have one quantity needed plus then 0.');

module.exports = mongoose.model('Restock', RestockSchema);