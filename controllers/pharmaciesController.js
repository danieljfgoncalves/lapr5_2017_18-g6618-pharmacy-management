// controllers/pharmaciesController.js

var Pharmacy = require('../models/Pharmacy');
var Location = require('../models/Location');
var Restock = require('../models/Restock');
var Order = require('../models/Order');
var Sale = require('../models/Sale');
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

var fillPresentation = function (stock) {
    var idStock = stock.id_stock;
    var quantity = stock.quantity;
    var idPresentation = stock.id_presentation;

    if (idPresentation == undefined) {
        idPresentation = stock.presentation.id_presentation;
    }

    if (idPresentation !== null) {
        
        
       var presentation = medicinesClient.getPresentation(idPresentation);

        if (presentation) {
            fillStock(quantity, presentation)
        }
    }
    return stock;
}


var verifyLocation = function (loc) {

    return new Promise((resolve, reject) => {
        Pharmacy.findOne({
            location: loc
        }), function (err, finded) {
            if (err) return res.status(500).send(err);
            if (finded) return res.status(404).send('There is already a pharmacy on inserted location ');
            resolve(finded);
        };
    });
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
exports.get_pharmacy_orders = function (req, res) {
    

    
}

// GET /api/pharmacy/{id}/sale
exports.get_pharmacy_sales = function (req, res) {
    return res.status(200).send("Route GET /api/pharmacy/{id}/sale under construction");
}

// GET /api/pharmacy/{id}/restock
exports.get_pharmacy_restocks = function (req, res) {
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

        //Each location must have just one pharmacy
        verifyLocation(locationCreated);
        pharmacy.location = locationCreated;
    } else {
        //Each location must have just one pharmacy
        verifyLocation(req.body.location);
        pharmacy.location = req.body.location;
    }

    async.each(req.body.stocks, function (stock, callback) {
        var stock = fillPresentation(req.body.stocks);
        pharmacy.stocks.push(stock);
        callback();
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

// GET /api/pharmacy/:id/stock/
exports.get_pharmacy_stock = function (req, res) {

    Pharmacy.findById(req.params.pharmacyId, function (err, pharmacy) {
        if (err) return res.status(500).send(err);
        if (!pharmacy) return res.status(404).send('There isn´t a pharmacy with the given ID.');

        var stock = pharmacy.stocks.find(s => s.id === req.params.pharmacyId); // ?????????????????????
        if (!stock) return res.status(404).send('There isn´t stock with the given ID in pharmacy.');
        return res.status(200).send(stock);
    })
}