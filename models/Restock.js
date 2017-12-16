// models/Restock.js

var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;
var ActivityLog = require('./ActivityLog').schema;

var RestockSchema = ActivityLog.extend({
    quantity: Number,
    presentation: {type: mongoose.Schema.Types.ObjectId,  ref:'Presentation', required: true},
});

RestockSchema.path('presentation').validate(presentation => {
    if(!presentation) {return false;}
    return true;
}, 'The restock must have one presentation.');

RestockSchema.path('quantity').validate(quantity => {
    if(quantity <= 0) {return false;}
    return true;
}, 'The restock must have one quantity needed plus then 0.');

module.exports = mongoose.model('Restock', RestockSchema);