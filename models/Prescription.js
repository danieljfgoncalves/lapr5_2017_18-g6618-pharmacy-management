// models/Prescription.js

var mongoose = require("mongoose");
var MedicinePresentationSchema = require('./MedicinePresentation');


var PrescriptionSchema = mongoose.Schema({
    //
    prescriptionId: { 
        type: String,
        required: true
    },
    receiptId:{ 
        type: String,
        required: true
    },
    medicinePresentation: {
        type: MedicinePresentationSchema,
        ref: 'MedicinePresentation',
        required: true
    }
});

module.exports.schema = PrescriptionSchema;
module.exports.model = mongoose.model('Prescription', PrescriptionSchema);