var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;
var ActivityLog = require('./ActivityLog').schema;

var OrderSchema = ActivityLog.extend({
    qttNeeded: Number,
    presentation: {type: mongoose.Schema.Types.ObjectId,  ref:'Presentation', required: true},
    location: {type: mongoose.Schema.Types.ObjectId,  ref:'Location', required: true},    
});

module.exports = mongoose.model('Order', OrderSchema);