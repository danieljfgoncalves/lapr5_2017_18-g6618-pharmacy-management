// models/Sale.js

var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;
var ActivityLog = require('./ActivityLog').schema;
var PrescriptionSchema = require('./Prescription');

var SaleSchema = ActivityLog.extend({
    quantity: Number,
    prescription: {
        type: PrescriptionSchema,
        ref: 'Prescription',
        required: true
    },
});

SaleSchema.path('prescription').validate(prescription => {
    if (!prescription) { return false; }
    return true;
}, 'The sale must have one prescription.');

SaleSchema.path('quantity').validate(quantity => {
    if(quantity <= 0) {return false;}
    return true;
}, 'The sale must have one quantity needed plus then 0.');

module.exports = mongoose.model('Sale', SaleSchema);