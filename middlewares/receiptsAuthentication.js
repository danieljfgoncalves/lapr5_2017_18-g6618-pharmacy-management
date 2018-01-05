// receiptsAuthentication.js

const request = require('request');

exports.authenticateReceiptsManagement = (req, res, next) => {

    var options = {
        method: 'POST',
        url: 'https://lapr5-3da.eu.auth0.com/oauth/token',
        headers: {
            'content-type': 'application/json'
        },
        body: {
            grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
            username: 'pharmacist2',  //FIXME 
            password: 'lapr5',
            audience: 'https://receipts-backend-api/',
            scope: 'openid',
            client_id: req.headers.client_id,
            client_secret: req.headers.client_secret,
            realm: 'lapr5-user-db'
        },
        json: true
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        if (body.error) {
            res.status(500).json({
                error: body.error,
                description: body.error_description
            });
        } else {

            req.receiptsToken=body;
            next();
        }
    });

    
};