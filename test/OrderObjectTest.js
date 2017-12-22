var presentation = require('./MedicinePresentationObjectTest');
var pharmacy = require('./PharmacyObjectTest');

exports.orders = [
    {
        id_pharmacy:  pharmacy.pharmacy[0]._id,
        period_day: pharmacy.pharmacy[0].timeRestriction,
        date: "2017-12-22",
        qttNeeded: 2,        
        medicinePresentation: presentation.presentations[0],
        name_pharmacy: pharmacy.pharmacy[0].name,
        latitude: pharmacy.pharmacy[0].location.latitude,
        longitude: pharmacy.pharmacy[0].location.longitude
    },
    {
        id_pharmacy:  pharmacy.pharmacy[1]._id,
        period_day: pharmacy.pharmacy[1].timeRestriction,
        date: "2017-12-22",
        qttNeeded: 22,
        period_day: "tarde",
        medicinePresentation: presentation.presentations[1],
        name_pharmacy: pharmacy.pharmacy[1].name,
        latitude: pharmacy.pharmacy[1].location.latitude,
        longitude: pharmacy.pharmacy[1].location.longitude
    },
    {
        id_pharmacy:  pharmacy.pharmacy[2]._id,
        period_day: pharmacy.pharmacy[2].timeRestriction,
        date: "2017-12-22",
        qttNeeded: 15,
        period_day: "manha",
        medicinePresentation: presentation.presentations[2],
        name_pharmacy: pharmacy.pharmacy[2].name,
        latitude: pharmacy.pharmacy[2].location.latitude,
        longitude: pharmacy.pharmacy[2].location.longitude
    },
    {
        id_pharmacy:  pharmacy.pharmacy[3]._id,
        period_day: pharmacy.pharmacy[3].timeRestriction,
        date: "2017-12-22",
        qttNeeded: 100,
        period_day: "manha",
        medicinePresentation: presentation.presentations[2],
        name_pharmacy: pharmacy.pharmacy[3].name,
        latitude: pharmacy.pharmacy[3].location.latitude,
        longitude: pharmacy.pharmacy[3].location.longitude
    },
    {
        id_pharmacy:  pharmacy.pharmacy[4]._id,
        period_day: pharmacy.pharmacy[4].timeRestriction,
        date: "2017-12-22",
        qttNeeded: 8,
        period_day: "tarde",
        medicinePresentation: presentation.presentations[0],
        name_pharmacy: pharmacy.pharmacy[4].name,
        latitude: pharmacy.pharmacy[4].location.latitude,
        longitude: pharmacy.pharmacy[4].location.longitude
    }    
];

