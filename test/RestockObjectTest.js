var presentation = require('./MedicinePresentationObjectTest');
var pharmacy = require('./PharmacyObjectTest');

exports.restocks = [
    {
        id_pharmacy:  pharmacy.pharmacy[0]._id,
        date: "2017-12-21",
        quantity: 2,
        medicinePresentation: presentation.presentations[0],
    },
    {
        id_pharmacy:  pharmacy.pharmacy[1]._id,
        date: "2017-12-20",
        quantity: 22,
        medicinePresentation: presentation.presentations[1],
    },
    {
        id_pharmacy:  pharmacy.pharmacy[2]._id,
        date: "2017-12-22",
        quantity: 15,
        medicinePresentation: presentation.presentations[4],
    },
    {
        id_pharmacy:  pharmacy.pharmacy[0]._id,
        date: "2017-12-22",
        quantity: 100,
        medicinePresentation: presentation.presentations[2],
    },
    {
        id_pharmacy:  pharmacy.pharmacy[0]._id,
        date: "2017-12-19",
        quantity: 8,
        medicinePresentation: presentation.presentations[0],
    },
    {
        id_pharmacy:  pharmacy.pharmacy[2]._id,
        date: "2017-12-21",
        quantity: 32,
        medicinePresentation: presentation.presentations[3],
    }, 
    {
        id_pharmacy:  pharmacy.pharmacy[3]._id,
        date: "2017-12-21",
        quantity: 48,
        medicinePresentation: presentation.presentations[2],
    }
];

