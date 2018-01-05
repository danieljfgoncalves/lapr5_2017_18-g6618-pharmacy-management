// controllers/receiptsController.js

var nodeRestClient = require('node-rest-client');
var receiptClient = require('../helpers/receiptsRequests');
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;

// GET /api/receipt/:id
exports.get_receipt = function (req, res) {

    req.headers.Authorization= "Bearer " + req.receiptsToken.access_token;
    Promise.join(
        receiptClient.getReceipt(req.params.id, req.headers),
        function (pst) {
            return res.status(200).json(pst);
        });

}