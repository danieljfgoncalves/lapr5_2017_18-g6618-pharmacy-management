// controllers/receiptsController.js

var nodeRestClient = require('node-rest-client');
var Order = require('../models/Order');

// GET /api/receipt/:id
exports.get_receipt = function(req,res){
    return res.status(200).json("Route GET /api/receipt/:id under construction");
}