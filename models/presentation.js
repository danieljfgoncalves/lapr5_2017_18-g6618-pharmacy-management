// models/presentation.js

var mongoose = require("mongoose");
var idvalidator = require('mongoose-id-validator');

var PresentationSchema = mongoose.Schema({   
    drug: String,    
    medicine: String,
    form: String,
    concentration: Number,
    packageQtt: Number  
});

//PresentationSchema.plugin(idvalidator);
module.exports = mongoose.model('Presentation', PresentationSchema);