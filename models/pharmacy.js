// models/pharmacy.js

var mongoose = require("mongoose");
var LocationSchema = require('./Location').schema;
var MedicinePresentationSchema = require('./MedicinePresentation').schema;

var StockShema = mongoose.Schema({
    quantity: { 
        type: Number,
        required: true,
        min: 1
    },
    minQuantity: {
        type: Number,
        default: 10
    },    
    medicinePresentation: {
        type: MedicinePresentationSchema,
        ref: 'MedicinePresentation',
        required: true
    },
})

StockShema.path('medicinePresentation').validate(medicinePresentation => {
    if (!medicinePresentation) { return false; }
    return true;
}, 'The order must have one presentation.');

var PharmacySchema = mongoose.Schema({
    name: { type: String,
        required: true},
    location: { type: LocationSchema, ref: 'Location', required: true },
    timeRestriction: String,
    stocks: [{
        type: StockShema
    }]
});

PharmacySchema.path('location').validate(location => {
    if (!location) { return false; }
    return true;
}, 'The pharmacy must have one location.');

module.exports = mongoose.model('Pharmacy', PharmacySchema);