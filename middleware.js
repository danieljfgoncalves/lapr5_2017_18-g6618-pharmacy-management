// ./middleware.js

var config = require('./config');
var nodeRestClient = require('node-rest-client');

exports.authenticateToken = (req, res, next) => {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
     // decode token
     if (token) {
        next();
     }  else {
         return res.status(403).send('No token provided');
     }
}