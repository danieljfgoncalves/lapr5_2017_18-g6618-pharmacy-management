// test/mock-objects.js
var Presentation = require('../models/presentation');
var Location = require('../models/Location');
var Order = require('../models/Order');

exports.pres= new Presentation({
  drug: "drug",    
  medicine: "medicine",
  form: "xarope",
  concentration: "demasiada",
  packageQtt: "50"  
});

exports.loc = new Location({
    latitude: "20",
    longitude: "30"
});

exports.o = Order({
  date : Date.now(),
  qttNeeded : 23,
  presentation : this.pres,
  location: this.loc
});