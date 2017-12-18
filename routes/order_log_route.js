// routes/order_log_route.js

var express     = require('express');
var router      = express.Router();
var middlewares = require('../middlewares/middleware');

// require controller modules
var ordersController=require('../controllers/ordersController');

// Add Authentication middleware
router.use('/order_log_route', middlewares.authenticateToken);

// GET /api/order/
router.get('/order', ordersController.get_orders);

// GET /api/order/{id}/
router.get('/order/:id', ordersController.get_order);

// POST /api/order
router.post('/order', ordersController.post_order);

module.exports=router;