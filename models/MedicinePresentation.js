// models/Presentation.js

var mongoose = require("mongoose");

var MedicinePresentationSchema = mongoose.Schema({  
    drug: String,    
    medicine: String,
    form: String,
    concentration: String,
    packageQtt: Number  
});

module.exports.schema = MedicinePresentationSchema;
module.exports.model = mongoose.model('MedicinePresentation', MedicinePresentationSchema);