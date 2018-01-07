// routes/restock_log_route.js

var express = require('express');
var router  = express.Router();

var medicinesAuth = require('../middlewares/medicinesAuthentication');

var restocksController = require('../controllers/restockController');


// GET /api/restock
router.get('/restock', restocksController.get_restocks);

// GET /api/restock/{id}/
router.get('/restock/:id', restocksController.get_restock);

// GET /api/restock/medicine/{name}
router.get('/restock/medicine/:name', restocksController.get_restock_medicine_name);

// GET /api/restock/drug/{name}
router.get('/restock/drug/:name', restocksController.get_restock_drug_name);

// POST /api/restock/
router.post('/restock', medicinesAuth.authenticateMedicinesManagement, restocksController.post_restock);


module.exports = router;