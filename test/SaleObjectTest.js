var prescription = require('./PrescriptionObjectTest');
var pharmacy = require('./PharmacyObjectTest');

exports.sales = [
    {
        id_pharmacy:  pharmacy.pharmacy[0]._id,
        quantity: 1,
        prescription: prescription.prescriptions[0],
    }

    /*,
    {
        id_pharmacy:  pharmacy.pharmacy[0]._id,
        date: "2017-12-21",
        quantity: 1,
        prescription: prescription.prescriptions[1],
    },
    {
        id_pharmacy:  pharmacy.pharmacy[0]._id,
        date: "2017-12-21",
        quantity: 1,
        prescription: prescription.prescriptions[1],
    },
    {
        id_pharmacy:  pharmacy.pharmacy[1]._id,
        date: "2017-12-21",
        quantity: 1,
        prescription: prescription.prescriptions[2],
    },
    {
        id_pharmacy:  pharmacy.pharmacy[1]._id,
        date: "2017-12-21",
        quantity: 1,
        prescription: prescription.prescriptions[0],
    },
    {
        id_pharmacy:  pharmacy.pharmacy[2]._id,
        date: "2017-12-21",
        quantity: 1,
        prescription: prescription.prescriptions[3],
    }, 
    {
        id_pharmacy:  pharmacy.pharmacy[2]._id,
        date: "2017-12-21",
        quantity: 1,
        prescription: prescription.prescriptions[2],
    },
    {
        id_pharmacy:  pharmacy.pharmacy[2]._id,
        date: "2017-12-21",
        quantity: 1,
        prescription: prescription.prescriptions[4],
    },
    {
        id_pharmacy:  pharmacy.pharmacy[2]._id,
        date: "2017-12-21",
        quantity: -1,
        prescription: prescription.prescriptions[2],
    }*/

];
