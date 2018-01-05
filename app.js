//app.js

// BASE SETUP
// ===========================================

// call the packages we need
var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// DATABASE SETUP
var config = require('./config');
var mongoose = require('mongoose');
var mongoOptions = {
  useMongoClient: true
};

mongoose.connect(config.mongoURI[app.get('env')], mongoOptions, error => {
  if (error) {
    console.log('Error connecting to the database. ' + error);
  } else {
    //if(app.get('env')!= 'test') 
    console.log('Connected to Database: ' + config.mongoURI[app.get('env')]);
  }
});

// use morgan to log requests to the console
if (app.get('env') != 'test') app.use(morgan('dev'));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================
var index = require('./routes/index');
var pharmacies = require('./routes/pharmacy_route');
var orders = require('./routes/order_log_route');
var sales = require('./routes/sale_log_route');
var restocks = require('./routes/restock_log_route');
var logs = require('./routes/activity_route');
var receipts = require('./routes/receipt_route');
var medicinePresentations = require('./routes/medicine_presentation_route');
var status = require('./routes/status_route');
var login = require('./routes/login_route');

// REGISTER OUR ROUTES ------------------
app.use('/', index);
app.use('/api/', pharmacies);
app.use('/api/', orders);
app.use('/api/', sales);
app.use('/api/', restocks);
app.use('/api/', logs);
app.use('/api/', receipts);
app.use('/api/', medicinePresentations);
app.use('/api/', status);
app.use('/api/', login);

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
  if (req) console.log('PharmacyManagement working');
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;