// routes/restock_log_route.js

var express     = require('express');
var router      = express.Router();
var middlewares = require('../middlewares/middleware');

// require controller modules
var restocksController=require('../controllers/restocksController');

// Add Authentication middleware
router.use('/restock_log_route', middlewares.authenticateToken);

// GET /api/restock/{pharmacyId}
router.get('/restock/:id', restocksController.get_pharmachy_restocks);

// GET /api/restock/{pharmacyId}/restock/{id}/
router.get('/restock/:id/restock/:id', restocksController.get_restock);

// POST /api/restock/{pharmacyId}/restock
router.post('/restock/:id/restock', restocksController.post_restock);
