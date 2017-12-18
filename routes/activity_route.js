// routes/activity_route.js

var express     = require('express');
var router      = express.Router();
var middlewares = require('../middlewares/middleware');

// require controller modules
var activityController=require('../controllers/activityController');

// Add Authentication middleware
router.use('/activity_route', middlewares.authenticateToken);

// GET /api/pharmacyLog/{id}
router.get('/pharmacyLog/:id', activityController.get_log);

// GET /api/pharmacyLog/{date}
router.get('/pharmacyLog/:date', activityController.get_log_date);

// GET /api/pharmacyLog/{date}/since
router.get('/pharmacyLog/:date/since', activityController.get_log_sinceDate);

module.exports=router;