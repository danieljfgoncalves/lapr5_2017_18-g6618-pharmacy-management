var presentation = require('./MedicinePresentationObjectTest');

exports.prescriptions = [
        {
            receiptId: "5a06fa2ca166db300207505b",
            prescriptionId : "5a06fa2da166db300207505c",
            medicinePresentation: presentation.presentations[0],
        },
        {
            receiptId: "5a06fa2ca166db300207505b",
            prescriptionId : "5a06fa2da166db300207505d",
            medicinePresentation: presentation.presentations[1],
        },
        {
            receiptId: "5a06fa2ca166db300207505d",
            prescriptionId : "5a06fa2da166db300207505e",
            medicinePresentation: presentation.presentations[2],
        },
        {
            receiptId: "5a06fa2ca166db300207505d",
            prescriptionId : "5a06fa2da166db300207505f",
            medicinePresentation: presentation.presentations[3],
        }

];