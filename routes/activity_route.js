// routes/activity_route.js

var express     = require('express');
var router      = express.Router();
var middlewares = require('../middlewares/middleware');

// require controller modules
var activityController=require('../controllers/activityController');

// Add Authentication middleware
router.use('/activity_route', middlewares.authenticateToken);

// GET /api/pharmacyLog
router.get('/pharmacyLog', activityController.get_logs);

// GET /api/pharmacyLog/{id}
router.get('/pharmacyLog/:id', activityController.get_log);

// GET /api/pharmacyLog/date/{dateI}  (dateI ex -> 2017-12-20)
router.get('/pharmacyLog/date/:dateI', activityController.get_log_date);

// GET /api/pharmacyLog/since/{dateI}
router.get('/pharmacyLog/since/:dateI/', activityController.get_log_sinceDate);

module.exports=router;