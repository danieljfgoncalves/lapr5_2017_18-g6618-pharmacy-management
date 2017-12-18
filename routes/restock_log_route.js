// routes/restock_log_route.js

var express     = require('express');
var router      = express.Router();
var middlewares = require('../middlewares/middleware');

// require controller modules
var restocksController=require('../controllers/restockController');

// Add Authentication middleware
router.use('/restock_log_route', middlewares.authenticateToken);

// GET /api/restock
router.get('/restock', restocksController.get_restocks);

// GET /api/restock/{id}/
router.get('/restock/:id', restocksController.get_restock);

// POST /api/restock/
router.post('/restock', restocksController.post_restock);

module.exports=router;