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

var fillStock = function (s) {
    var stock = {
        "id_pharmacy": s.id_pharmacy,
        "quantity": s.quantity,
        "minQuantity": s.minQuantity,
        "medicinePresentation": s.medicinePresentation
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
    Pharmacy.find({
        '_id': req.params.id
    },
        function (err, phar) {
            if (err)
                return res.status(500).send(err);
            if (phar != undefined) {
                var s;
                for (let i = 0; i < phar[0].stocks.length; i++) {
                    if (phar[0].stocks[i]._id == req.params.stockId) {
                        s = fillStock(phar[0].stocks[i]);
                        return res.status(200).json(s);
                    }
                }
                return res.status(400).send("There isn´t a pharmacy with the given stock id.");
            }
        });
}

// GET /api/pharmacy/{id}/stock/medicine/{name}
exports.get_pharmacy_medicine_stock = function (req, res) {
    Pharmacy.find({
        '_id': req.params.id,
    },
        function (err, phar) {
            if (err)
                return res.status(500).send(err);
            if (phar != undefined) {
                var s;
                for (let i = 0; i < phar[0].stocks.length; i++) {
                    if (phar[0].stocks[i].medicinePresentation.medicine == req.params.name) {
                        s = fillStock(phar[0].stocks[i]);
                        return res.status(200).json(s);
                    }
                }
                return res.status(400).send("There isn´t a pharmacy with the given medicine.");
            }
        });
}

// GET /api/pharmacy/{id}/stock/drug/{name}
exports.get_pharmacy_drug_stock = function (req, res) {
    Pharmacy.find({
        '_id': req.params.id,
    },
        function (err, phar) {
            if (err)
                return res.status(500).send(err);
            if (phar != undefined) {
                var s;
                for (let i = 0; i < phar[0].stocks.length; i++) {
                    if (phar[0].stocks[i].medicinePresentation.drug == req.params.name) {
                        s = fillStock(phar[0].stocks[i]);
                        return res.status(200).json(s);
                    }
                }
                return res.status(400).send("There isn´t a pharmacy with the given drug.");
            }
        });
}

// GET /api/pharmacy/{id}/order
exports.get_pharmacy_orders = function (req, res) {
    Order.find({
        'id_pharmacy': req.params.id,
        '_type': "Order"
    }, function (err, orders) {
        if (err)
            return res.status(500).send(err);
        if (orders != undefined) {
            return res.status(200).json(orders);
        } else {
            return res.status(400).send("There aren´t registered orders.");
        }
    });
}

// GET /api/pharmacy/{id}/sale
exports.get_pharmacy_sales = function (req, res) {
    Sale.find({
        'id_pharmacy': req.params.id,
        '_type': "Sale"
    }, function (err, sales) {
        if (err)
            return res.status(500).send(err);
        if (sales != undefined) {
            return res.status(200).json(sales);
        } else {
            return res.status(400).send("There aren´t registered sales.");
        }
    });
}

// GET /api/pharmacy/{id}/restock
exports.get_pharmacy_restocks = function (req, res) {
    Restock.find({
        'id_pharmacy': req.params.id,
        '_type': "Restock"
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
