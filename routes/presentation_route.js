// routes/presentation_route.js

var express     = require('express');
var router      = express.Router();
var middlewares = require('../middlewares/middleware');

// require controller modules
var presentationsController=require('../controllers/presentationsController');

// Add Authentication middleware
router.use('/presentation_route', middlewares.authenticateToken);

// GET /api/presentation
router.get('/presentation', presentationsController.get_presentations);

// GET /api/presentation/{id}
router.get('/presentation/:id', presentationsController.get_presentation);

module.exports=router;