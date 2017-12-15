// models/pharmacy.js

var mongoose = require("mongoose");
var idvalidator = require('mongoose-id-validator');

var PharmacySchema = mongoose.Schema({   
    name: String,    
    local: String,
    location: LocationSchema,
    stocks: [{       
        quantity: Number,
        presentation: {type: mongoose.Schema.Types.ObjectId,  ref:'Presentation', required: true},
    }]    
});

var Location = new Schema({
    latitude: String,
    longitude: String
});

PharmacySchema.path('location').validate(location=>{
    if(!location) {return false}
    return true;
}, 'The pharmacy must have one location.');


//PharmacySchema.plugin(idvalidator);
module.exports = mongoose.model('Pharmacy', PharmacySchema);