// controllers/ordersController.js

var nodeRestClient = require('node-rest-client');
var Order = require('../models/Order');

// GET /api/order
exports.get_orders = function(req,res){
    Order.find({
        _type: "Order"
    },function (err, orders) {
        if (err)
            return res.status(500).send(err);
        if (orders != undefined) {
            return res.status(200).json(orders);
        } else {
            return res.status(400).send("There aren´t registered orders.");
        }
    });
}

// GET /api/order/{id}
exports.get_order= function(req,res){
    return res.status(200).send("Route GET /api/order/{id} under construction");
}
