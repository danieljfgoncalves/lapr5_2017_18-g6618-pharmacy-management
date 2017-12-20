// controllers/restockController.js

var nodeRestClient = require('node-rest-client');
var config = require('../config');
var Restock = require('../models/Restock');
var Pharmacy = require('../models/Pharmacy');
var update = require('../services/UpdateStockService');
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;

// GET /api/restock
exports.get_restocks = function (req, res) {

    Restock.find({
        _type: "Restock"
    }, function (err, restocks) {
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
exports.get_restock = function (req, res) {
    Restock.findById(req.params.id, function (err, restock) {
        if (err) return res.status(500).send(err);
        if (!restock) return res.status(404).send("There isn´t a restock with the given ID.");
        return res.status(200).send(restock);
    })
}

// GET /api/restock/medicine/{name}
exports.get_restock_medicine_name = function (req, res) {
    Restock.find({
        '_type': "Restock",
        'medicinePresentation.medicine': req.params.name,
    }, function (err, restock) {
        if (err) return res.status(500).send(err);
        if (!restock) return res.status(404).send("There isn´t a restock of a medicine with the given name.");
        return res.status(200).send(restock);
    })
}

// GET /api/restock/drug/{name}
exports.get_restock_drug_name = function (req, res) {
    Restock.find({
        '_type': "Restock",
        'medicinePresentation.drug': req.params.name,
    }, function (err, restock) {
        if (err) return res.status(500).send(err);
        if (!restock) return res.status(404).send("There isn´t a restock of a drug with the given name.");
        return res.status(200).send(restock);
    })
}

// POST /api/restock
exports.post_restock = function (req, res) {
    var restock = new Restock({
        id_pharmacy: req.body.id_pharmacy,
        quantity: req.body.quantity,
        medicinePresentation: req.body.medicinePresentation
    });

    Promise.join(
        update.updateStock(
            restock.id_pharmacy,
            restock.medicinePresentation,
            restock.quantity,
            config.sub),
        function (check) {

            restock.save(function (err) {
                if (err) return res.status(500).send(err);
                return res.status(201).json({ message: 'Restock Created', restock });
            })

        });

}