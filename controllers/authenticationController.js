var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;

// controllers/authentication.js
var nodeRestClient = require('node-rest-client');
var receiptRequests = require('../helpers/receiptsRequests');
//function to authenticate an user and reply a token
exports.postAuthentication = function (req, res) {
    //TODO 
    Promise.join(
        receiptRequests.login(req.body.username, req.body.password),
        function (pst) {
            console.log(pst);
            return res.status(200).json(pst);
        });
}

//function to get users
exports.getUser = (req, res) => {
    //TODO
}