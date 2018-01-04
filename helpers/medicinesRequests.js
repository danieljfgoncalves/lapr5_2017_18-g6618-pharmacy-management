// helpers/medicinesRequests.js

var config = require('../config');
var Client = require('node-rest-client').Client;
var client = new Client();
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;

//presentation from Medicines backend
exports.getPresentation = function (access_token, id) {
    if (id == null) return;

    return new Promise((resolve, reject) => {
        
        var url = config.medicines_backend.urlPresentations+ id + '/detailed'

        var args = {
            headers: {
                "Authorization": "Bearer " + access_token,
                'content-type': 'application/json'
            }
        };
        
        client.get(url, args, function (data, response) {
            resolve(data);
        })
    });
}

//presentations from Medicines backend
exports.getPresentations = function (access_token) {

    return new Promise((resolve, reject) => {
        
        var args = {
            headers: {
                "Authorization": "Bearer " + access_token,
                'content-type': 'application/json'
            }
        };

        client.get(config.medicines_backend.urlPresentationsDetailed, args, function (data) {
            resolve(data);
        })
    });
}