// models/Pharmacy.js

var mongoose = require("mongoose");
var LocationSchema = require('./Location').schema;

var StockShema = mongoose.Schema({
    quantity: Number,
    presentation: {type: mongoose.Schema.Types.ObjectId,  ref:'Presentation', required: true},
})

StockShema.path('presentation').validate(presentation => {
    if(!presentation) {return false;}
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