// controllers/medicinePresentationsController.js

var nodeRestClient = require('node-rest-client');
var Order = require('../models/Order');

// GET /api/medicinePresentation
exports.get_med_presentations = function(req,res){
    return res.status(200).json("Route GET /api/medicinePresentation under construction");
}

// GET /api/medicinePresentation/:id
exports.get_med_presentation = function(req,res){
    return res.status(200).json("Route GET /api/medicinePresentation/:id under construction");
}