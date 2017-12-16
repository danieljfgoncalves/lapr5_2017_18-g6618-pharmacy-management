// models/Presentation.js

var mongoose = require("mongoose");

var PresentationSchema = mongoose.Schema({   
    drug: String,    
    medicine: String,
    form: String,
    concentration: String,
    packageQtt: Number  
});

module.exports = mongoose.model('Presentation', PresentationSchema);