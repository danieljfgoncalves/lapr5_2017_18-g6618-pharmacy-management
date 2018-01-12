// routes/order_log_route.js

var express = require('express');
var router  = express.Router();

var requireRoles  = require('../middlewares/requireRoles');
var handleToken   = require('../middlewares/handleToken');

var ordersController = require('../controllers/ordersController');

if (process.env.NODE_ENV != 'test') {
    // authentication middlewares
    router.use('/order',
    handleToken.handleToken,
    requireRoles.requireRoles(['admin', 'pharmacist'])
    );
}

// GET /api/order/
router.get('/order', ordersController.get_orders);

// GET /api/order/medicine/{name}
router.get('/order/medicine/:name', ordersController.get_order_medicine_name);

// GET /api/order/drug/{name}
router.get('/order/drug/:name', ordersController.get_order_drug_name);

// GET /api/order/{id}/
router.get('/order/:id', ordersController.get_order);


module.exports = router;