// routes/sale_log_route.js

var express     = require('express');
var router      = express.Router();

var medicinesAuth = require('../middlewares/medicinesAuthentication');
var requireRoles  = require('../middlewares/requireRoles');
var handleToken   = require('../middlewares/handleToken');

var salesController = require('../controllers/salesController');

if (process.env.NODE_ENV != 'test') {
    // authentication middlewares
    router.use('/sale',
    handleToken.handleToken,
    requireRoles.requireRoles(['admin', 'pharmacist'])
    );
}

// GET /api/sale
router.get('/sale', salesController.get_sales);

// GET /api/sale/{id}
router.get('/sale/:id', salesController.get_sale);

// GET /api/sale/receipt/{id}
router.get('/sale/receipt/:id', salesController.get_receipt);

// GET /api/sale/receipt/{id}/prescription/{idPresc}
router.get('/sale/receipt/:id/prescription/:idPresc', salesController.get_prescriptions);

// GET /api/sale/medicine/{name}
router.get('/sale/medicine/:name', salesController.get_sale_medicine_name);

// GET /api/sale/drug/{name}
router.get('/sale/drug/:name', salesController.get_sale_drug_name);

// POST /api/sale
router.post('/sale', medicinesAuth.authenticateMedicinesManagement, salesController.post_sale);


module.exports = router;