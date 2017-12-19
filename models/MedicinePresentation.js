// models/Presentation.js

var mongoose = require("mongoose");

var MedicinePresentationSchema = mongoose.Schema({  
    drug: String,    
    medicine: String,
    form: String,
    concentration: String,
    packageQtt: Number,
    // saves id from MedicinesAPI
    id_medicine: {
        type: String, 
        required: true
    },
    id_presentation: {
        type: String, 
        required: true
    }
});

module.exports.schema = MedicinePresentationSchema;
module.exports.model = mongoose.model('MedicinePresentation', MedicinePresentationSchema);