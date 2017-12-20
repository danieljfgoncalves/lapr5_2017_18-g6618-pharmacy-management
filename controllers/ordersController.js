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
    Order.findById(req.params.id, function (err, order) {
        if (err) return res.status(500).send(err);
        if (!order) return res.status(404).send("There isn´t a order with the given ID.");
        return res.status(200).send(order);
    })
}

// GET /api/order/medicine/{name}
exports.get_order_medicine_name = function (req, res) {
    Order.find({
        '_type': "Order",
        'medicinePresentation.medicine': req.params.name,
    }, function (err, order) {
        if (err) return res.status(500).send(err);
        if (!order) return res.status(404).send("There isn´t a order of a medicine with the given name.");
        return res.status(200).send(order);
    })
}

// GET /api/order/drug/{name}
exports.get_order_drug_name = function (req, res) {
    Order.find({
        '_type': "Order",
        'medicinePresentation.drug': req.params.name,
    }, function (err, order) {
        if (err) return res.status(500).send(err);
        if (!order) return res.status(404).send("There isn´t a order of a drug with the given name.");
        return res.status(200).send(order);
    })
}
