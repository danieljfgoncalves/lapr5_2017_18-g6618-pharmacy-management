var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();


app.use('/', index);


// PARA TESTE -> FAZER TESTES UNITARIOS ********************** RETIRAR
var Presentation = require('./models/Presentation');
var pres = new Presentation({
  drug: "drug",    
  medicine: "medicine",
  form: "xarope",
  concentration: "demasiada",
  packageQtt: "50"  
});

var Location = require('./models/Location');
var loc = new Location({
    latitude: "20",
    longitude: "30"
});

var Order = require('./models/Order');
var o = new Order({
  date : Date.now(),
  qttNeeded : 23,
  presentation : pres,
  location: loc
});
// FIM PARA TESTE -> FAZER TESTES UNITARIOS ********************** RETIRAR

console.log(o);

module.exports = app;
