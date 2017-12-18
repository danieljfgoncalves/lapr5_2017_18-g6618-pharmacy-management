var location = require('./LocationObjectTest');
var presentation = require('./MedicinePresentationObjectTest');

exports.pharmacy = [
    {
        name: "Pharmacy1",
        location: location.locations[4],
        stocks: [
            {
                quantity: 45,
                minQuantity: 10,
                medicinePresentation: presentation.presentations[0]
            },
            {
                quantity: 12,
                minQuantity: 10,
                medicinePresentation: presentation.presentations[2]
            },
            {
                quantity: 76,
                minQuantity: 25,
                medicinePresentation: presentation.presentations[3]
            },
            {
                quantity: 32,
                minQuantity: 10,
                medicinePresentation: presentation.presentations[1]
            }
        ]
    },
    {
        name: "Pharmacy2",
        location: location.locations[2],
        stocks: [
            {
                quantity: 45,
                minQuantity: 10,
                medicinePresentation: presentation.presentations[0]
            },
            {
                quantity: 12,
                minQuantity: 10,
                medicinePresentation: presentation.presentations[2]
            },
            {
                quantity: 76,
                minQuantity: 25,
                medicinePresentation: presentation.presentations[3]
            },
            {
                quantity: 32,
                minQuantity: 10,
                medicinePresentation: presentation.presentations[1]
            }
        ]
    },
    {
        name: "Pharmacy3",
        location: location.locations[0],
        stocks: [
            {
                quantity: 45,
                minQuantity: 10,
                medicinePresentation: presentation.presentations[0]
            },
            {
                quantity: 12,
                minQuantity: 10,
                medicinePresentation: presentation.presentations[2]
            },
            {
                quantity: 76,
                minQuantity: 25,
                medicinePresentation: presentation.presentations[3]
            },
            {
                quantity: 32,
                minQuantity: 10,
                medicinePresentation: presentation.presentations[1]
            }
        ]
    },
    {
        name: "Pharmacy4",
        location: location.locations[1],
        stocks: [
            {
                quantity: 45,
                minQuantity: 10,
                medicinePresentation: presentation.presentations[0]
            },
            {
                quantity: 12,
                minQuantity: 10,
                medicinePresentation: presentation.presentations[2]
            },
            {
                quantity: 76,
                minQuantity: 25,
                medicinePresentation: presentation.presentations[3]
            },
            {
                quantity: 32,
                minQuantity: 10,
                medicinePresentation: presentation.presentations[1]
            }
        ]
    },
    {
        name: "Pharmacy5",
        location: location.locations[5],
        stocks: [
            {
                quantity: 45,
                minQuantity: 10,
                medicinePresentation: presentation.presentations[0]
            },
            {
                quantity: 12,
                minQuantity: 10,
                medicinePresentation: presentation.presentations[2]
            },
            {
                quantity: 76,
                minQuantity: 25,
                medicinePresentation: presentation.presentations[3]
            },
            {
                quantity: 32,
                minQuantity: 10,
                medicinePresentation: presentation.presentations[1]
            }
        ]
    }

];