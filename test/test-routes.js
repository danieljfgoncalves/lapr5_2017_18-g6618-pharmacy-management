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

        this.timeout(15000);
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

            it('[POST] shouldn\'t register pharmacy with invalid longitude',
            function (done) {
                chai.request(server)
                    .post('/api/pharmacy')
                    .send({
                        name: correctName,
                        timeRestriction: "17:00",
                        location: locationObj.locations[1]
                    })
                    .end(function (err, res) {
                        res.should.have.status(404);
                        done();
                    });
            });

            it('[POST] shouldn\'t register pharmacy with invalid latitude',
            function (done) {
                chai.request(server)
                    .post('/api/pharmacy')
                    .send({
                        name: correctName,
                        timeRestriction: "17:00",
                        location: locationObj.locations[2]
                    })
                    .end(function (err, res) {
                        res.should.have.status(404);
                        done();
                    });
            });

    });

    describe('TESTING: Request Medicine', function () {
        this.timeout(15000);
        afterEach(function (done) {
            Sale.remove({
                date: "2017-12-21"
            }, done);
        });

        it('[POST] shouldn\'t register sale without medicine presentation',
            function (done) {
                chai.request(server)
                    .post('/api/sale')
                    .send({
                        sale: saleObj.sales[7]
                    })
                    .end(function (err, res) {
                        res.should.have.status(403);
                        done();
                    });
            });
    });

    describe('TESTING: Request Medicine', function () {


        it('[POST] shouldn\'t register sale with negative quantity',
            function (done) {
                chai.request(server)
                    .post('/api/sale')
                    .send({
                        sale: saleObj.sales[8]
                    })
                    .end(function (err, res) {
                        res.should.have.status(403);
                        done();
                    });
            });
    
/*
    it('[POST] should request medicine',
            function (done) {
                chai.request(server)
                    .post('/api/sale')
                    .send({
                       sale: saleObj.sales[0]
                    })
                    .end(function (err, res) {
                        res.should.have.status(201);
                        console.log(res);
                     
                        done();
                    });
            });
        });
        */

    describe('TESTING: Restock', function () {

    });



});

