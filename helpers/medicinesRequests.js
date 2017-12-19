// helpers/medicinesRequests.js

var config = require('../config');
var Client = require('node-rest-client').Client;
var client = new Client();
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;

//-----------------NOT TESTED - Auth0 isn´t availabe
exports.getTokenMedicineAPI = function () {
    //TODO
}

//presentation from Medicines backend
exports.getPresentation = function (id) {
    if (id == null) return;

    return new Promise((resolve, reject) => {
        
                var url = config.medicines_backend.urlPresentations+ id + '/detailed'
               
                client.get(url, config.medicines_backend.args, function (data, response) {
                    resolve(data);
                })
            });


}

//presentations from Medicines backend
exports.getPresentations = function () {

    return new Promise((resolve, reject) => {

        client.get(config.medicines_backend.urlPresentations, config.medicines_backend.args, function (data, response) {
            resolve(data);
        })
    });
}

//presentations detailed from Medicines backend
exports.getPresentationsDetailed = function () {
   
    return new Promise((resolve, reject) => {
        
                client.get(config.medicines_backend.urlPresentationsDetailed, config.medicines_backend.args, function (data, response) {
                    resolve(data);
                })
            });
}