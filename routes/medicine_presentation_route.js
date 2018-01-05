// routes/medicine_presentation_route.js

var express = require('express');
var router  = express.Router();

var requireRoles  = require('../middlewares/requireRoles');
var handleToken   = require('../middlewares/handleToken');
var medicinesAuth = require('../middlewares/medicinesAuthentication');

var medicinePController = require('../controllers/medicinePresentationsController');


// authentication middlewares
router.use('/medicinePresentation', 
    handleToken.handleToken, 
    requireRoles.requireRoles(['admin', 'pharmacist']), 
    medicinesAuth.authenticateMedicinesManagement);

// GET /api/medicinePresentation
router.get('/medicinePresentation', medicinePController.get_med_presentations);

// GET /api/medicinePresentation/{id}/
router.get('/medicinePresentation/:id', medicinePController.get_med_presentation);


module.exports = router;