// models/Pharmacy.js

var mongoose = require("mongoose");
var LocationSchema = require('./Location').schema;
var MedicinePresentationSchema = require('./MedicinePresentation').schema;

var StockShema = mongoose.Schema({
    quantity: Number,
    medicinePresentation: {
        type: MedicinePresentationSchema,  
        ref:'MedicinePresentation', 
        required: true
    },
})

StockShema.path('medicinePresentation').validate(medicinePresentation => {
    if(!medicinePresentation) {return false;}
    return true;
}, 'The order must have one presentation.');

var PharmacySchema = mongoose.Schema({   
    name: String,    
    location: {type: LocationSchema,  ref:'Location', required: true},    
    stocks: [{       
        type: StockShema  
    }]    
});

PharmacySchema.path('location').validate(location => {
    if(!location) {return false;}
    return true;
}, 'The pharmacy must have one location.');

module.exports = mongoose.model('Pharmacy', PharmacySchema);