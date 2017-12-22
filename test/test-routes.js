// /test/test-routes.js
process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
var Promise = require('bluebird');
var server = require('../app');
var should = chai.should();
var assert = chai.assert;
chai.use(chaiHttp);

// Mock-objects
var locationObj = require('./LocationObjectTest');
var medPresentObj = require('./MedicinePresentationObjectTest');
var orderObj = require('./OrderObjectTest');
var pharmacyObj = require('./PharmacyObjectTest');
var prescriptionObj = require('./PrescriptionObjectTest');
var restockObj = require('./RestockObjectTest');
var saleObj = require('./SaleObjectTest');

// Models
var Location = require('../models/Location');
var MedicinePresentation = require('../models/MedicinePresentation');
var Order = require('../models/Order');
var Pharmacy = require('../models/Pharmacy');
var Prescription = require('../models/Prescription').model;
var Restock = require('../models/Restock');
var Sale = require('../models/Sale');



describe('  ***  PHARMACY MANAGEMENT TESTS  ***  ', function () {

    describe('TESTING: Pharmacy', function () {

        var correctName = "PharmacyTest";

        afterEach(function (done) {
            Pharmacy.remove({
                name: correctName
            }, done);
        });
        it('[POST] should register pharmacy',
            function (done) {
                chai.request(server)
                    .post('/api/pharmacy')
                    .send({
                        name: correctName,
                        location: locationObj.locations[0],
                        timeRestriction: "17:00"
                    })
                    .end(function (err, res) {
                        res.should.have.status(201);
                        done();
                    });
            });
        it('[POST] shouldn\'t register pharmacy with no name',
            function (done) {
                chai.request(server)
                    .post('/api/pharmacy')
                    .send({
                        location: locationObj.locations[0],
                        timeRestriction: "17:00"
                    })
                    .end(function (err, res) {
                        res.should.have.status(500);
                        done();
                    });
            });
        it('[POST] shouldn\'t register pharmacy with no location',
            function (done) {
                chai.request(server)
                    .post('/api/pharmacy')
                    .send({
                        name: correctName,
                        timeRestriction: "17:00"
                    })
                    .end(function (err, res) {
                        res.should.have.status(500);
                        done();
                    });
            });


    });

    describe('TESTING: Sale', function () {

    });

    describe('TESTING: Restock', function () {

    });



});

