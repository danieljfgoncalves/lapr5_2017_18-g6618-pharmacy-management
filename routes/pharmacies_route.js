// routes/pharmacies_route.js

var express     = require('express');
var router      = express.Router();

// require controller modules
var pharmaciesController=require('../controllers/pharmaciesController');

// GET /api/pharmacy
router.get('/pharmacy', pharmaciesController.get_pharmacies);

// GET /api/pharmacy/{id}
router.get('/pharmacy/:id', pharmaciesController.get_pharmacy);

// GET /api/pharmacy/{id}/stock/{id}
router.get('/pharmacy/:pharmacyId/stock/:stockId', pharmaciesController.get_pharmacy_stock);

// POST /api/pharmacy
router.get('/pharmacy', pharmaciesController.post_pharmacy);

module.exports=router;