// ./config.js

// app configurations
module.exports = {
    'secret': 'lapr2017',

    'mongoURI': {
        'production': 'mongodb://admin:admin@ds141796.mlab.com:41796/lapr5-6618-pharmacy-management',
        // 'development': 'mongodb://admin:admin@ds141796.mlab.com:41796/lapr5_pharmacies_g6618',
        'development': 'mongodb://admin:admin@ds141796.mlab.com:41796/lapr5-6618-pharmacy-management',
        'test': 'mongodb://admin:admin@ds141796.mlab.com:41796/lapr5_pharmacies_g6618',
    },

    'multipStockFactor': 2,
    'add': '+',
    'sub': '-',

    'medicines_backend': {

        'urlPresentations': 'http://lapr5-g6618-medicines-management.azurewebsites.net/api/presentations/',
        'urlPresentationsDetailed': 'http://lapr5-g6618-medicines-management.azurewebsites.net/api/presentations/detailed',
        'args': {
            'headers': {
                "Content-Type": "application/json",
            }
        }
    },

    'orders_url': 'http://lapr5-g6618-orders-management.azurewebsites.net/api/orders'
}
