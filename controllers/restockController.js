// controllers/restockController.js

var nodeRestClient = require('node-rest-client');
var Restock = require('../models/Restock');

// GET /api/restock
exports.get_restocks = function(req,res){
    Restock.find(function (err, restocks) {
        if (err)
            return res.status(500).send(err);
        if (restocks != undefined) {
            return res.status(200).json(restocks);
        } else {
            return res.status(400).send("There aren´t registered restocks.");
        }
    });
}

// GET /api/restock/{id}
exports.get_restock = function(req,res){
    Restock.findById(req.params.id, function (err, restock) {
        if (err) return res.status(500).send(err);
        if (!restock) return res.status(404).send("There isn´t a restock with the given ID.");
        return res.status(200).send(restock);
    })
}

// POST /api/restock
exports.post_restock= function(req,res){
    var r = new Restock();

    r.id_pharmacy = req.body.id_pharmacy
    r.quantity = req.body.quantity;
    r.medicinePresentation = req.body.medicinePresentation;

    r.save(function (err) {
        if (err) return res.status(500).send(err);

        // TODO -> CALL UPDATE STOCK SERVICE
        return res.status(201).json({ message: 'Restock Created', r })
    })
}