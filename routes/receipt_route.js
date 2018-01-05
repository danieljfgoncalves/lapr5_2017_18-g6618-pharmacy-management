// routes/receipt_route.js

var express = require('express');
var router  = express.Router();

var requireRoles  = require('../middlewares/requireRoles');
var handleToken   = require('../middlewares/handleToken');

var receiptsController = require('../controllers/receiptsController');


// authentication middlewares
router.use('/receipt',
    handleToken.handleToken,
    requireRoles.requireRoles(['admin', 'pharmacist']));

// GET /api/receipt/{id}/
router.get('/receipt/:id', receiptsController.get_receipt);


module.exports = router;