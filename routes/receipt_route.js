// routes/receipt_route.js

var express     = require('express');
var router      = express.Router();

var handleToken   = require('../middlewares/handleToken');
var requireRoles  = require('../middlewares/requireRoles');
var receiptsAuth  = require('../middlewares/receiptsAuthentication');

var receiptsController = require('../controllers/receiptsController');


// authentication middlewares
if (process.env.NODE_ENV != 'test') {
    router.use('/receipt',
        handleToken.handleToken,
        requireRoles.requireRoles(['admin', 'pharmacist']),
        receiptsAuth.authenticateReceiptsManagement);
}

// GET /api/receipt/{id}/
router.get('/receipt/:id', receiptsController.get_receipt);


module.exports = router;