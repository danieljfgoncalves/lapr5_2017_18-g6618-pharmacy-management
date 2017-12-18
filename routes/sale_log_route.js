// routes/sale_log_route.js

var express     = require('express');
var router      = express.Router();
var middlewares = require('../middlewares/middleware');

// require controller modules
var salesController=require('../controllers/salesController');

// Add Authentication middleware
router.use('/sale_log_route', middlewares.authenticateToken);

// GET /api/sale
router.get('/salePharm', salesController.get_sales);

// GET /api/sale/{id}
router.get('/sale/:id', salesController.get_sale);

// POST /api/sale
router.post('/sale', salesController.post_sale);

// GET /api/sale/receipt/{id}
router.get('/sale/receipt/:id', salesController.get_receipt);

// GET /api/sale/receipt/{id}/prescription
router.get('/sale/receipt/:id/prescription', salesController.get_prescriptions);

module.exports=router;