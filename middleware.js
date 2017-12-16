// ./middleware.js

var config = require('./config');
var nodeRestClient = require('node-rest-client');

exports.authenticate = (req, res, next) => {
    next();
}