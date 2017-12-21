// controllers/medicinePresentationsController.js

var nodeRestClient = require('node-rest-client');
var Order = require('../models/Order');
var medicineClient = require('../helpers/medicinesRequests');
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;

// GET /api/medicinePresentation
exports.get_med_presentations = function(req,res){

    Promise.join(
        medicineClient.getPresentations(),
        function (pst) {
            return res.status(200).json(pst);
    });

}

// GET /api/medicinePresentation/:id
exports.get_med_presentation = function(req,res){
    Promise.join(
        medicineClient.getPresentation(req.params.id),
        function (pst) {
            return res.status(200).json(pst);
    });

}