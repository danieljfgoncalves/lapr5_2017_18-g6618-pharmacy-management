// models/pharmacy.js

var mongoose = require("mongoose");

var PharmacySchema = mongoose.Schema({   
    name: String,    
    location: {type: mongoose.Schema.Types.ObjectId,  ref:'Location', required: true},    
    stocks: [{       
        quantity: Number,
        presentation: {type: mongoose.Schema.Types.ObjectId,  ref:'Presentation', required: true},
    }]    
});


module.exports = mongoose.model('Pharmacy', PharmacySchema);