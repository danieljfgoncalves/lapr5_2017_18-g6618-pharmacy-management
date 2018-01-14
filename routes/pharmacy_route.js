// routes/pharmacies_route.js

var express     = require('express');
var router      = express.Router();

var requireRoles  = require('../middlewares/requireRoles');
var handleToken   = require('../middlewares/handleToken');

var pharmaciesController = require('../controllers/pharmaciesController');

if (process.env.NODE_ENV != 'test') {
    // authentication middlewares
    router.use('/pharmacy',
        handleToken.handleToken,
        requireRoles.requireRoles(['admin', 'pharmacist']));
}

// GET /api/pharmacy
router.get('/pharmacy', pharmaciesController.get_pharmacies);

// GET /api/pharmacy/{id}
router.get('/pharmacy/:id', pharmaciesController.get_pharmacy);

// GET /api/pharmacy/{id}/stock/{id}
router.get('/pharmacy/:id/stock/:stockId', pharmaciesController.get_pharmacy_stock);

// GET /api/pharmacy/{id}/stock/medicine/{name}
router.get('/pharmacy/:id/stock/medicine/:name', pharmaciesController.get_pharmacy_medicine_stock);

// GET /api/pharmacy/{id}/stock/drug/{name}
router.get('/pharmacy/:id/stock/drug/:name', pharmaciesController.get_pharmacy_drug_stock);

// GET /api/pharmacy/{id}/order
router.get('/pharmacy/:id/order', pharmaciesController.get_pharmacy_orders);

// GET /api/pharmacy/{id}/sale
router.get('/pharmacy/:id/sale', pharmaciesController.get_pharmacy_sales);

// GET /api/pharmacy/{id}/restock
router.get('/pharmacy/:id/restock', pharmaciesController.get_pharmacy_restocks);

// POST /api/pharmacy
router.post('/pharmacy', pharmaciesController.post_pharmacy);

// POST /api/pharmacy
router.post('/pharmacy/all', pharmaciesController.post_pharmacys);


module.exports = router;