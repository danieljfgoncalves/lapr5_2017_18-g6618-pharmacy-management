// routes/pharmacies_route.js

var express     = require('express');
var router      = express.Router();
var middlewares = require('../middlewares/middleware');

// require controller modules
var pharmaciesController=require('../controllers/pharmaciesController');

// Add Authentication middleware
router.use('/pharmacies_route', middlewares.authenticateToken);

// GET /api/pharmacy
router.get('/pharmacy', pharmaciesController.get_pharmacies);

// GET /api/pharmacy/{id}
router.get('/pharmacy/:id', pharmaciesController.get_pharmacy);

// GET /api/pharmacy/{id}/stock/{id}
router.get('/pharmacy/:pharmacyId/stock/:stockId', pharmaciesController.get_pharmacy_stock);

// POST /api/pharmacy
router.post('/pharmacy', pharmaciesController.post_pharmacy);

module.exports=router;