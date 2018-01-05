var express = require('express');
var router = express.Router();

var AuthenticationConstroller = require('../controllers/authenticationController');
//router.use('/medicinePresentation', 

router.get('/login', function (req, res, next) {
    return res.status(200).json({
        "message": 'Pharmacy Management API Login Route'
    });

});

router.post('/login', AuthenticationConstroller.postAuthentication);


module.exports = router;