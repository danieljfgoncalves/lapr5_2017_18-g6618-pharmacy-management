// models/Pharmacy.js

var mongoose = require("mongoose");

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
    location: {type: mongoose.Schema.Types.ObjectId,  ref:'Location', required: true},    
    stocks: [{       
        type: StockShema,
        required: true   
    }]    
});

PharmacySchema.path('location').validate(location => {
    if(!location) {return false;}
    return true;
}, 'The pharmacy must have one location.');

module.exports = mongoose.model('Pharmacy', PharmacySchema);