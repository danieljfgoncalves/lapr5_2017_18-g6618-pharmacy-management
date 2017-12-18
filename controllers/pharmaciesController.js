// controllers/pharmaciesController.js

var Pharmacy = require('../models/Pharmacy');
var Location = require('../models/Location');
var MedicinePresentation = require('../models/MedicinePresentation');
var config = require('../config');
var nodeRestClient = require('node-rest-client');
var async = require('async');
var medicinesClient = require('../helpers/medicinesRequests');
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;

var fillStock = function (qtt, pst) {
    var stock = {
        "quantity": qtt,
        "medicinePresentation": {
            "id_presentation": pst.id,
            "drug": pst.drug,
            "medicine": pst.medicine,
            "form": pst.form,
            "concentration": pst.concentration,
            "packageQtt": pst.packageQtt
        },
    }
    return stock;
}

// GET /api/pharmacy
exports.get_pharmacies = function (req, res) {

    Pharmacy.find(function (err, pharmacies) {
        if (err)
            return res.status(500).send(err);
        if (pharmacies != undefined) {
            return res.status(200).json(pharmacies);
        } else {
            return res.status(400).send("There aren´t registered pharmacies.");
        }
    });

}

// GET /api/pharmacy/{id}/order
exports.get_pharmacy_orders=function (req, res) {
    return res.status(200).send("Route GET /api/pharmacy/{id}/order under construction");
}

// GET /api/pharmacy/{id}/sale
exports.get_pharmacy_sales=function (req, res) {
    return res.status(200).send("Route GET /api/pharmacy/{id}/sale under construction");
}

// GET /api/pharmacy/{id}/restock
exports.get_pharmacy_restocks=function (req, res) {
    return res.status(200).send("Route GET /api/pharmacy/{id}/restock under construction");
}

// POST /api/pharmacy
exports.post_pharmacy = function (req, res) {

    var pharmacy = new Pharmacy();

    pharmacy.name = req.body.name;

    //finding location variables
    var location = req.body.location;

    if (location == undefined) {
        var latitude = req.body.latitude;
        var longitude = req.body.longitude;
        var locationCreated = new Location({
            latitude: latitude,
            longitude: longitude
        });
        pharmacy.location = locationCreated;
    } else {
        pharmacy.location = req.body.location;
    }

        async.each(req.body.stocks, function (stock, callback) {
            var idStock = stock.id_stock;
            var quantity = stock.quantity;
            var idPresentation = stock.id_presentation;

            if (idPresentation == undefined) {
                idPresentation = stock.presentation.id_presentation;
            }

            if (idPresentation !== null) {


                //helper getTokenMedicamentosAPI

                var stock = fillStock(quantity, stock.presentation);
                pharmacy.stocks.push(stock);
                callback();

            }
        }, function (err) {

            pharmacy.save(function (err) {
                if (err) return res.status(500).send(err);
                return res.status(201).json({ message: 'Pharmacy Created', pharmacy })
            })
        });

}

// GET /api/pharmacy/:id
exports.get_pharmacy = function (req, res) {

    Pharmacy.findById(req.params.id, function (err, pharmacy) {
        if (err) return res.status(500).send(err);
        if (!pharmacy) return res.status(404).send("There isn´t a pharmacy with the given ID.");
        return res.status(200).send(pharmacy);
    })
}

// GET /api/pharmacy/:id/stock/:id
exports.get_pharmacy_stock = function (req, res) {

    Pharmacy.findById(req.params.pharmacy_id, function (err, pharmacy) {
        if (err) return res.status(500).send(err);
        if (!pharmacy) return res.status(404).send('There isn´t a pharmacy with the ginve ID.');

        var stock = pharmacy.stocks.find(s => s.id === req.params.id);
        if (!stock) return res.status(404).send('There isn´t stock with the given ID in pharmacy.');
        return res.status(200).send(stock);
    })
}