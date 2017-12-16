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
var config=require('./config');
var mongoose=require('mongoose');
var mongoOptions = { useMongoClient: true };

mongoose.connect(config.database, mongoOptions, error => {
  if (error) {
    console.log('Error connecting to the database. ' + error);
  } else {
    console.log('Connected to Database: ' + config.database);
  }
});


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));


// ROUTES FOR OUR API
// =============================================================================

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
var router = express.Router();
router.get('/', function (req, res) {
    res.json({ message: 'Welcome to PharmacyManagement!' });
});
app.use('/home', router);

// ========= ROUTES ======================
var pharmacies=require('./routes/pharmacies_route');

// REGISTER OUR ROUTES ------------------
app.use('/api/', pharmacies);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

//test
var order=require('./test/test-routes');

module.exports = app;
