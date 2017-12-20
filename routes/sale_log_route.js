// routes/sale_log_route.js

var express     = require('express');
var router      = express.Router();
var middlewares = require('../middlewares/middleware');

// require controller modules
var salesController=require('../controllers/salesController');

// Add Authentication middleware
router.use('/sale_log_route', middlewares.authenticateToken);

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
router.post('/sale', salesController.post_sale);

module.exports=router;