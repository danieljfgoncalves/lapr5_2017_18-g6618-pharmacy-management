// models/Prescription.js

var mongoose = require("mongoose");

var FillSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    quantity: Number
});

var PrescriptionSchema = new Schema({
    prescriptionId: String,
    receiptId: String,
    expirationDate: {
        type: Date
    },
    presentation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Presentation',
        required: true
    },
    quantity: {
        type: Number,
        required: 'Quantity is required',
        min: 1
    },
    fills: [FillSchema]
});

module.exports.schema = PrescriptionSchema;
module.exports.model = mongoose.model('Prescription', PrescriptionSchema);