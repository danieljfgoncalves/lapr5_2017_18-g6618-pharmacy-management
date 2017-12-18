// controllers/salesController.js

var nodeRestClient = require('node-rest-client');

// GET /api/sale/{pharmacyId}
exports.get_pharmachy_sales = function(req,res){
    return res.status(200).send("Route GET /api/sale/{pharmacyId} under construction");
}

// GET /api/sale/{pharmacyId}/sale/{id}/
exports.get_sale= function(req,res){
    return res.status(200).send("Route GET /api/sale/{pharmacyId}/sale/{id}/ under construction");
}

// POST /api/sale/{pharmacyId}/sale
exports.post_sale = function(req,res){
    return res.status(200).send("Route POST /api/sale/{pharmacyId}/sale under construction");
}