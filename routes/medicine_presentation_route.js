// routes/medicine_presentation_route.js

var express       = require('express');
var router        = express.Router();
var middlewares   = require('../middlewares/middleware');
var medicinesAuth = require('../middlewares/medicinesAuthentication');

// require controller modules
var medicinePController=require('../controllers/medicinePresentationsController');

// Add Authentication middleware
router.use('/medicine_presentation_route', middlewares.authenticateToken);

// GET /api/medicinePresentation
router.get('/medicinePresentation', medicinesAuth.authenticateMedicinesManagement, medicinePController.get_med_presentations);

// GET /api/medicinePresentation/{id}/
router.get('/medicinePresentation/:id', medicinesAuth.authenticateMedicinesManagement, medicinePController.get_med_presentation);

module.exports=router;