var location = require('./LocationObjectTest');
var presentation = require('./PresentationObjectTest');

exports.orders = [
    {
        qttNeeded: 2,
        period_day: "manha",
        presentation: presentation[0],
        location: location[0]
    },
    {
        qttNeeded: 22,
        period_day: "tarde",
        presentation: presentation[1],
        location: location[1]
    },
    {
        qttNeeded: 15,
        period_day: "manha",
        presentation: presentation[2],
        location: location[2]
    },
    {
        qttNeeded: 100,
        period_day: "manha",
        presentation: presentation[2],
        location: location[1]
    },
    {
        qttNeeded: 8,
        period_day: "tarde",
        presentation: presentation[0],
        location: location[2]
    }    
];

