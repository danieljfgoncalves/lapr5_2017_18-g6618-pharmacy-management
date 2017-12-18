// controllers/salesController.js

var nodeRestClient = require('node-rest-client');

// GET /api/sale/
exports.get_sales = function(req,res){
    return res.status(200).send("Route GET /api/sale/ under construction");
}

// GET /api/sale/{id}/
exports.get_sale= function(req,res){
    return res.status(200).send("Route GET /api/sale/{id}/ under construction");
}

// POST /api/sale
exports.post_sale = function(req,res){
    return res.status(200).send("Route POST /api/sale/ under construction");
}

// GET /api/sale/receipt/{id}
exports.get_receipt = function (req,res){
    return res.status(200).send("Route GET /api/sale/receipt/{id} under construction");
}

// GET /api/sale/receipt/{id}/prescription
exports.get_prescriptions = function(req,res){
    return res.status(200).send("Route GET /api/sale/receipt/{id}/prescription under construction");
}
