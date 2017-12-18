// routes/sale_log_route.js

var express     = require('express');
var router      = express.Router();
var middlewares = require('../middlewares/middleware');

// require controller modules
var salesController=require('../controllers/salesController');

// Add Authentication middleware
router.use('/sale_log_route', middlewares.authenticateToken);

// GET /api/sale/{pharmacyId}
router.get('/sale/:id', salesController.get_pharmachy_sales);

// GET /api/sale/{pharmacyId}/sale/{id}/
router.get('/sale/:id/sale/:id', salesController.get_sale);

// POST /api/sale/{pharmacyId}/sale
router.post('/sale/:id/sale', salesController.post_sale);
