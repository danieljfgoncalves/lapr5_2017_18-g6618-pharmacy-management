// controllers/ordersController.js

var nodeRestClient = require('node-rest-client');

// GET /api/order/{pharmacyId}
exports.get_pharmachy_orders = function(req,res){
    return res.status(200).send("Route GET /api/order/{pharmacyId} under construction");
}

// GET /api/order/{pharmacyId}/order/{id}/
exports.get_order= function(req,res){
    return res.status(200).send("Route GET /api/order/{pharmacyId}/order/{id}/ under construction");
}

// POST /api/order/{pharmacyId}/order
exports.post_order= function(req,res){
    return res.status(200).send("Route POST /api/order/{pharmacyId}/order under construction");
}