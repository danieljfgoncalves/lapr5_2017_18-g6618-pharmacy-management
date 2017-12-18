// ./config.js

// app configurations
module.exports = {
    'secret':'lapr2017',

    'mongoURI':{
      'production': 'mongodb://admin:admin@ds141796.mlab.com:41796/lapr5-6618-pharmacy-management',
      'development': 'mongodb://admin:admin@ds141796.mlab.com:41796/lapr5-6618-pharmacy-management',
      'test': 'mongodb://admin:admin@ds141796.mlab.com:41796/lapr5_pharmacies_g6618',
    }
    //API isn´t available
   /* 'medicines_backend':{
        "url": "???",
        "email": "???",
        "secret": "Lapr-2017"
    },
    'urlMedicinesToken': 'http://medicamentosapi2017.azurewebsites.net/api/Account/Token',
    'urlPresentationById': 'http://medicamentosapi2017.azurewebsites.net/api/Apresentacao/', 
    'loginMedicines': '{email:"a@a.pt", password:"Qwerty1!"}',
    */  
  }
