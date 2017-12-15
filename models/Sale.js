var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;
var ActivityLog = require('./ActivityLog').schema;

var SaleSchema = ActivityLog.extend({
    quantity: Number,
    presentation: {type: mongoose.Schema.Types.ObjectId,  ref:'Presentation', required: true},
});

module.exports = mongoose.model('Sale', SaleSchema);