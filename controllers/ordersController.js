// controllers/ordersController.js

var nodeRestClient = require('node-rest-client');

// GET /api/order
exports.get_orders = function(req,res){
    return res.status(200).send("Route GET /api/order/ under construction");
}

// GET /api/order/{id}
exports.get_order= function(req,res){
    return res.status(200).send("Route GET /api/order/{id} under construction");
}

// POST /api/order/
exports.post_order= function(req,res){
    return res.status(200).send("Route POST /api/order/ under construction");
}