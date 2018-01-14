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
var update = require('../services/UpdateStockService');


// GET /api/pharmacy
exports.get_pharmacies = function (req, res) {

    Pharmacy.find(function (err, pharmacies) {
        if (err)  return res.status(500).send(err);
        if (pharmacies != undefined) return res.status(200).json(pharmacies);
        return res.status(400).send("There aren´t registered pharmacies.");
    });
}

// GET /api/pharmacy/{id}
exports.get_pharmacy = function (req, res) {
    Pharmacy.findById(req.params.id, function (err, pharmacy) {
        if (err) return res.status(500).send(err);
        if (!pharmacy) return res.status(404).send("There isn´t a pharmacy with the given ID.");
        return res.status(200).send(pharmacy);
    })
}

// GET /api/pharmacy/{id}/stock/{id}
exports.get_pharmacy_stock = function (req, res) {

    Pharmacy.find({ '_id': req.params.id},
        {'stocks': {'$elemMatch':{'_id':req.params.stockId}}}
        , function (err, st) {
            if (err) return res.status(500).send(err);
            if(st[0].stocks[0]==undefined) return res.status(404).json('There isn´t stock with the id entered in pharmacy');
            return res.status(200).json(st);
        })     
}

// GET /api/pharmacy/{id}/stock/medicine/{name}
exports.get_pharmacy_medicine_stock = function (req, res) {
    Pharmacy.find({ '_id': req.params.id},
        { 'stocks': {'$elemMatch': { 'medicinePresentation.medicine': req.params.name}}} 
        , function (err, st) {
            if (err) return res.status(500).send(err);
            if(st[0].stocks[0]==undefined) return res.status(404).json('There aren´t stocks with the medicine name entered');
            return res.status(200).json(st);
        })
}

// GET /api/pharmacy/{id}/stock/drug/{name}
exports.get_pharmacy_drug_stock = function (req, res) {
    Pharmacy.find({'_id': req.params.id },
        { 'stocks': { '$elemMatch': { 'medicinePresentation.drug': req.params.name }}}
        , function (err, st) {
            if (err) return res.status(500).send(err);
            if(st[0].stocks[0]==undefined) return res.status(404).json('There aren´t stocks with the drug name entered');
        
            return res.status(200).json(st);
        })
}

// GET /api/pharmacy/{id}/order
exports.get_pharmacy_orders = function (req, res) {
    Order.find({
        'id_pharmacy': req.params.id,
        '_type': "Order"
    }, function (err, orders) {
        if (err) return res.status(500).send(err);
        if (orders != undefined) return res.status(200).json(orders);
        return res.status(400).send("There aren´t registered orders.");    
    });
}

// GET /api/pharmacy/{id}/sale
exports.get_pharmacy_sales = function (req, res) {
    Sale.find({
        'id_pharmacy': req.params.id,
        '_type': "Sale"
    }, function (err, sales) {
        if (err) return res.status(500).send(err);
        if (sales != undefined) return res.status(200).json(sales);

        return res.status(400).send("There aren´t registered sales.");

    });
}

// GET /api/pharmacy/{id}/restock
exports.get_pharmacy_restocks = function (req, res) {
    Restock.find({
        'id_pharmacy': req.params.id,
        '_type': "Restock"
    }, function (err, restocks) {
        if (err) return res.status(500).send(err);
        if (restocks != undefined) return res.status(200).json(restocks);

        return res.status(400).send("There aren´t registered restocks.");

    });
}

// POST /api/pharmacy
exports.post_pharmacy = function (req, res) {

    //finding location variables
    Location: loc = req.body.location;

    if (loc == undefined) {
        var latitude = req.body.latitude;
        var longitude = req.body.longitude;
        loc = new Location({
            latitude: latitude,
            longitude: longitude
        });
    }
    if(loc.latitude>90 || loc.latitude<-90) return res.status(404).send('Please insert a valid latitude (between -90 and 90).');
    if(loc.longitude<-180 || loc.longitude>180) return res.status(404).send('Please insert a valid longitude (between -180 and 180).');

    Pharmacy.create({
        location: loc,
        name: req.body.name,
        timeRestriction: req.body.timeRestriction,
    }, function (err, pharm) {
        if (err) return res.status(500).json(err);
        // saved!
        return res.status(201).send(pharm);
    });
}

// POST /api/pharmacy/all
exports.post_pharmacys = function (req, res) {

    var pharms = [];
    async.each(req.body, (bodyElement, callback) => {
        //finding location variables
        Location: loc = bodyElement.location;

        if (loc == undefined) {
            var latitude = bodyElement.latitude;
            var longitude = bodyElement.longitude;
            loc = new Location({
                latitude: latitude,
                longitude: longitude
            });
        }
        if (loc.latitude > 90 || loc.latitude < -90) return res.status(404).send('Please insert a valid latitude (between -90 and 90).');
        if (loc.longitude < -180 || loc.longitude > 180) return res.status(404).send('Please insert a valid longitude (between -180 and 180).');

        Pharmacy.create({
            location: loc,
            name: bodyElement.name,
            timeRestriction: bodyElement.timeRestriction,
        }, function (err, pharm) {
            if (err) return res.status(500).json(err);
            // saved!
            pharms.push(pharm);
            callback();
        });
    }, function (err) {
        // if any of the file processing produced an error, err would equal that error
        if (err) return res.status(500).json(err);
        return res.status(201).send(pharms);
    });
};
