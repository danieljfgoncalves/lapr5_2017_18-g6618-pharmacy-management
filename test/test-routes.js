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

// UpdateStock
var createOrder = require('../services/CreateOrderService');

var correctName = "PharmacyTest";
var id_pharmacy;
var id_sale;
var id_restock;
var id_order;
var id_prescription = prescriptionObj.prescriptions[0].prescriptionId;
var id_receipt = prescriptionObj.prescriptions[0].receiptId;
var name_medicine = prescriptionObj.prescriptions[0].medicinePresentation.medicine;
var name_drug = prescriptionObj.prescriptions[0].medicinePresentation.drug;

var postPharmacy = x => {
    return new Promise(resolve => {
        chai.request(server)
            .post('/api/pharmacy')
            .send({
                name: correctName,
                location: locationObj.locations[0],
                timeRestriction: "18:00"
            })
            .end(function (err, res) {
                res.should.have.status(201);
                resolve(res.body._id);
            });
    });
}

var postSale = id => {
    return new Promise(resolve => {
        chai.request(server)
            .post('/api/sale')
            .send(
            {
                id_pharmacy: id,
                quantity: "1",
                prescription: prescriptionObj.prescriptions[0]
            })
            .end(function (err, res) {
                res.should.have.status(201);
                resolve(res.body.sale._id);
            });
    });
}

var postRestock = id => {
    return new Promise(resolve => {
        chai.request(server)
            .post('/api/restock')
            .send(
            {
                id_pharmacy: id,
                quantity: "11",
                medicinePresentation: medPresentObj.presentations[0]
            })
            .end(function (err, res) {
                res.should.have.status(201);
                resolve(res.body.restock._id);
            });
    });
}

describe('  ***  PHARMACY MANAGEMENT TESTS  ***  ', function () {

    before(async function () {
        Pharmacy.collection.remove();
        Sale.collection.remove();
        id_pharmacy = await postPharmacy('pharmacy');
        id_sale = await postSale(id_pharmacy);
        id_restock = await postRestock(id_pharmacy);
    });

    describe('TESTING: Pharmacy', function () {
        it('[POST] register pharmacy ',
            function (done) {
                chai.request(server)
                    .post('/api/pharmacy')
                    .send({
                        name: correctName,
                        location: locationObj.locations[3],
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
                        location: locationObj.locations[1],
                        timeRestriction: "17:00"
                    })
                    .end(function (err, res) {
                        res.should.have.status(404);
                        done();
                    });
            });
        it('[POST] shouldn\'t register pharmacy with no location',
            function (done) {
                chai.request(server)
                    .post('/api/pharmacy')
                    .send({
                        name: correctName,
                        timeRestriction: "16:00"
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
                        timeRestriction: "15:00",
                        location: {
                            longitude: '45',
                        }
                    })
                    .end(function (err, res) {
                        res.should.have.status(500);
                        done();
                    });
            });

        it('[POST] shouldn\'t register pharmacy with invalid latitude',
            function (done) {
                chai.request(server)
                    .post('/api/pharmacy')
                    .send({
                        name: correctName,
                        timeRestriction: "14:00",
                        location:
                            {
                                latitude: '45',
                            },
                    })
                    .end(function (err, res) {
                        res.should.have.status(500);
                        done();
                    });
            });

        it('[GET] all pharmacies',
            function (done) {
                chai.request(server)
                    .get('/api/pharmacy')
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                    });
            });

        it('[GET] pharmacy by id',
            function (done) {
                chai.request(server)
                    .get('/api/pharmacy/' + id_pharmacy)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                    });
            });

    });

    describe('TESTING: Status Database', function () {
        it('[GET] status',
            function (done) {
                chai.request(server)
                    .get('/api/status')
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                    });
            });
    });

    describe('TESTING: Sale', function () {
        it('[POST] sale',
            function (done) {
                var sale = new Sale({
                    id_pharmacy: "123456789abc",
                    quantity: "1",
                    prescription: prescriptionObj.prescriptions[0]
                });
                chai.request(server)
                    .post('/api/sale')
                    .send(sale)
                    .end(function (err, res) {
                        res.should.have.status(201);
                        done();
                    });
            });

        it('[POST] shouldn\'t register sale without pharmacy id',
            function (done) {
                var sale = new Sale({
                    quantity: "1",
                    prescription: prescriptionObj.prescriptions[0]
                });
                chai.request(server)
                    .post('/api/sale')
                    .send(sale)
                    .end(function (err, res) {
                        res.should.have.status(500);
                        done();
                    });
            });

        it('[POST] shouldn\'t register sale with invalid pharmacy id',
            function (done) {
                var sale = new Sale({
                    id_pharmacy: null,
                    quantity: "1",
                    prescription: prescriptionObj.prescriptions[0]
                });
                chai.request(server)
                    .post('/api/sale')
                    .send(sale)
                    .end(function (err, res) {
                        res.should.have.status(500);
                        done();
                    });
            });

        it('[POST] shouldn\'t register sale without quantity',
            function (done) {
                var sale = new Sale({
                    id_pharmacy: id_pharmacy,
                    prescription: prescriptionObj.prescriptions[0]
                });
                chai.request(server)
                    .post('/api/sale')
                    .send(sale)
                    .end(function (err, res) {
                        res.should.have.status(500);
                        done();
                    });
            });

        it('[POST] shouldn\'t register sale with negative quantity',
            function (done) {
                var sale = new Sale({
                    id_pharmacy: id_pharmacy,
                    quantity: "-1",
                    prescription: prescriptionObj.prescriptions[0]
                });
                chai.request(server)
                    .post('/api/sale')
                    .send(sale)
                    .end(function (err, res) {
                        res.should.have.status(500);
                        done();
                    });
            });

        it('[POST] shouldn\'t register sale without prescription',
            function (done) {
                var sale = new Sale({
                    id_pharmacy: id_pharmacy,
                    quantity: "1"
                });
                chai.request(server)
                    .post('/api/sale')
                    .send(sale)
                    .end(function (err, res) {
                        res.should.have.status(500);
                        done();
                    });
            });

        it('[GET] all sales',
            function (done) {
                chai.request(server)
                    .get('/api/sale')
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                    });
            });

        it('[GET] sale by id',
            function (done) {
                chai.request(server)
                    .get('/api/sale/' + id_sale)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                    });
            });

        it('[GET] sale by receipt id',
            function (done) {
                chai.request(server)
                    .get('/api/sale/receipt/' + id_receipt)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                    });
            });

        it('[GET] sale by receipt id and prescription id',
            function (done) {
                chai.request(server)
                    .get('/api/sale/receipt/' + id_receipt + '/prescription/' + id_prescription)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                    });
            });

        it('[GET] sale by medicine name',
            function (done) {
                chai.request(server)
                    .get('/api/sale/medicine/' + name_medicine)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                    });
            });

        it('[GET] sale by drug name',
            function (done) {
                chai.request(server)
                    .get('/api/sale/drug/' + name_drug)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                    });
            });

    });

    describe('TESTING: Order', function () {
        it('[POST] register order',
            function (done) {
                Pharmacy.findById(id_pharmacy, function (err, pharm) {
                    // ensure quantity above 10, if below will be sended a Order to OrdersManagement
                    var quantity = 11;
                    createOrder.createOrder(pharm, medPresentObj.presentations[0], quantity);
                });
                done();
            });

        it('[GET] all orders',
            function (done) {
                chai.request(server)
                    .get('/api/order')
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                    });
            });

        it('[GET] order by medicine name',
            function (done) {
                chai.request(server)
                    .get('/api/order/medicine/' + name_medicine)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                    });
            });

        it('[GET] order by drug name',
            function (done) {
                chai.request(server)
                    .get('/api/order/drug/' + name_drug)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                    });
            });
    });

    describe('TESTING: Restock', function () {
        it('[POST] register restock',
            function (done) {
                chai.request(server)
                    .post('/api/restock')
                    .send(
                    {
                        id_pharmacy: id_pharmacy,
                        quantity: "11",
                        medicinePresentation: medPresentObj.presentations[0]
                    })
                    .end(function (err, res) {
                        res.should.have.status(201);
                        done();
                    });
            });

        it('[POST] shouldn\'t register restock without pharmacy id',
            function (done) {
                var restock = new Restock({
                    quantity: "11",
                    medicinePresentation: medPresentObj.presentations[0]
                });
                chai.request(server)
                    .post('/api/restock')
                    .send(restock)
                    .end(function (err, res) {
                        res.should.have.status(500);
                        done();
                    });
            });

        it('[POST] shouldn\'t register restock with invalid pharmacy id',
            function (done) {
                var restock = new Restock({
                    id_pharmacy: null,
                    quantity: "11",
                    medicinePresentation: medPresentObj.presentations[0]
                });
                chai.request(server)
                    .post('/api/restock')
                    .send(restock)
                    .end(function (err, res) {
                        res.should.have.status(500);
                        done();
                    });
            });

        it('[POST] shouldn\'t register restock without quantity',
            function (done) {
                var restock = new Restock({
                    id_pharmacy: id_pharmacy,
                    medicinePresentation: medPresentObj.presentations[0]
                });
                chai.request(server)
                    .post('/api/restock')
                    .send(restock)
                    .end(function (err, res) {
                        res.should.have.status(500);
                        done();
                    });
            });

        it('[POST] shouldn\'t register restock with negative quantity',
            function (done) {
                var restock = new Restock({
                    id_pharmacy: id_pharmacy,
                    quantity: "-1",
                    medicinePresentation: medPresentObj.presentations[0]
                });
                chai.request(server)
                    .post('/api/restock')
                    .send(restock)
                    .end(function (err, res) {
                        res.should.have.status(500);
                        done();
                    });
            });

        it('[POST] shouldn\'t register restock without medicine presentation',
            function (done) {
                var restock = new Restock({
                    id_pharmacy: id_pharmacy,
                    quantity: "-1"
                });
                chai.request(server)
                    .post('/api/restock')
                    .send(restock)
                    .end(function (err, res) {
                        res.should.have.status(500);
                        done();
                    });
            });

        it('[GET] all restocks',
            function (done) {
                chai.request(server)
                    .get('/api/restock')
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                    });
            });

        it('[GET] restock by id',
            function (done) {
                chai.request(server)
                    .get('/api/restock/' + id_restock)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                    });
            });

        it('[GET] restock by medicine name',
            function (done) {
                chai.request(server)
                    .get('/api/restock/medicine/' + name_medicine)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                    });
            });

        it('[GET] restock by drug name',
            function (done) {
                chai.request(server)
                    .get('/api/restock/drug/' + name_drug)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                    });
            });
    });

    describe('TESTING: Activity Logs', function () {

        it('[GET] all activity logs',
            function (done) {
                chai.request(server)
                    .get('/api/pharmacyLog')
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                    });
            });

        it('[GET] activity logs by pharmacy id',
            function (done) {
                chai.request(server)
                    .get('/api/pharmacyLog/' + id_sale)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                    });
            });

        it('[GET] activity logs by date',
            function (done) {
                chai.request(server)
                    .get('/api/pharmacyLog/date/2018-01-01')
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                    });
            });

        it('[GET] activity logs since date',
            function (done) {
                chai.request(server)
                    .get('/api/pharmacyLog/since/2018-01-01')
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                    });
            });
    });

    after(function (done) {
        Pharmacy.collection.remove();
        Sale.collection.remove();
        done();
    });

});


