var location = require('./LocationObjectTest');
var presentation = require('./MedicinePresentationObjectTest');

exports.pharmacy = [
    {
        _id : "5a54308b666b4b0ca43792ee",
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
        ],
        timeRestriction: "17:00"
    },
    {
        _id : "5a543740b1be412f44fee514" ,
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
        ],
        timeRestriction: "17:00"
    },
    {
        _id : "5a54374cb1be412f44fee516",
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
        ],
        timeRestriction: "17:00"
    },
    {
        _id : "5a543b04c0f9021de40198d7",
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
        ],
        timeRestriction: "17:00"
    },
    {
        _id : "5a543b0ec0f9021de40198d9",
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
        ],
        timeRestriction: "17:00"
    }

];