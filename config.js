// ./config.js

// app configurations
module.exports = {
    'secret':'lapr2017',

    //Credentials mlab -> username: arqsi3a | password: Asist2000
   'medicinesDB':'mongodb://admin:admin@ds044787.mlab.com:44787/lapr5_medicines_g6618',
    'receiptsDB':'mongodb://admin:admin@ds046067.mlab.com:46067/lapr5_receipts_g6618',

    'mongoURI':{
      'production': 'mongodb://admin:admin@ds141796.mlab.com:41796/lapr5_pharmacies_g6618',
      'development': 'mongodb://admin:admin@ds141796.mlab.com:41796/lapr5_pharmacies_g6618',
     // 'test': '' 
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
