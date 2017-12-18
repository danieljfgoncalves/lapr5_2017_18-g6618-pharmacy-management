var presentation = require('./MedicinePresentationObjectTest');
var pharmacy = require('./PharmacyObjectTest');

exports.orders = [
    {
        qttNeeded: 2,
        period_day: "manha",
        medicinePresentation: presentation.presentations[0],
        name_pharmacy: pharmacy.pharmacy[0].name,
        latitude: pharmacy.pharmacy[0].location.latitude,
        longitude: pharmacy.pharmacy[0].location.longitude
    },
    {
        qttNeeded: 22,
        period_day: "tarde",
        medicinePresentation: presentation.presentations[1],
        name_pharmacy: pharmacy.pharmacy[1].name,
        latitude: pharmacy.pharmacy[1].location.latitude,
        longitude: pharmacy.pharmacy[1].location.longitude
    },
    {
        qttNeeded: 15,
        period_day: "manha",
        medicinePresentation: presentation.presentations[2],
        name_pharmacy: pharmacy.pharmacy[2].name,
        latitude: pharmacy.pharmacy[2].location.latitude,
        longitude: pharmacy.pharmacy[2].location.longitude
    },
    {
        qttNeeded: 100,
        period_day: "manha",
        medicinePresentation: presentation.presentations[2],
        name_pharmacy: pharmacy.pharmacy[3].name,
        latitude: pharmacy.pharmacy[3].location.latitude,
        longitude: pharmacy.pharmacy[3].location.longitude
    },
    {
        qttNeeded: 8,
        period_day: "tarde",
        medicinePresentation: presentation.presentations[0],
        name_pharmacy: pharmacy.pharmacy[4].name,
        latitude: pharmacy.pharmacy[4].location.latitude,
        longitude: pharmacy.pharmacy[4].location.longitude
    }    
];

