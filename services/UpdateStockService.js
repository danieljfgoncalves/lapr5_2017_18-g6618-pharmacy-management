// services/UpdateStockService

var config = require('../config');
var Pharmacy = require('../models/Pharmacy');
var Order = require('../models/Order');
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;
var math = require('mathjs');

exports.updateStock = function (id_phamacy, medicinePresentation, quantity, type) {
    return new Promise((resolve, reject) => {

        var ret;
        Pharmacy.findById(id_phamacy, function (err, pharmacy) {
            if (err)
                ret = { message: 'ERROR: ' + err , flag: false };
            if (pharmacy == undefined) {
                ret = { message: "There aren´t registered pharmacies.", flag: false };
            } else if(quantity <= 0){
                ret = { message: 'It was not possible finish operation! Negative quantity!', flag: false };
            } else {

                for (let i = 0; i < pharmacy.stocks.length; i++) {
                    var flag = false;
                    // verify if referenced stock is created in pharmacy and update
                    if (pharmacy.stocks[i].medicinePresentation.id_medicine == medicinePresentation.id_medicine
                        && pharmacy.stocks[i].medicinePresentation.id_presentation == medicinePresentation.id_presentation) {

                        var quant = parseInt(pharmacy.stocks[i].quantity);
                        var final_quant;

                        if (type == config.add){
                            final_quant = math.eval(parseInt(quant) + parseInt(quantity));
                        } else{
                            final_quant = math.eval(parseInt(quant) - parseInt(quantity));
                        }
                         
                        if (final_quant < 0) {
                            ret = { message: 'It was not possible finish operation! Insufficient Stock!', flag: false };
                            resolve(ret);
                        } else if (final_quant < pharmacy.stocks[i].minQuantity) {

                            var qtt = math.eval(parseInt(pharmacy.stocks[i].minQuantity) 
                                                * parseInt(config.multipStockFactor));

                            createOrder(pharmacy, medicinePresentation, qtt);
                        }
                        flag = true;
                        pharmacy.stocks[i].quantity = final_quant;
                        break;
                    }
                }
                var stock = {
                    quantity: quantity,
                    medicinePresentation: medicinePresentation
                };

                var stock = {
                    quantity: quantity,
                    medicinePresentation: medicinePresentation
                };

                if (!flag) {
                    pharmacy.stocks.push(stock);
                }

                pharmacy.save(function (err) {
                    if (err) ret = { message: 'ERROR' + err, flag: false };
                    ret = { message: 'Stock updated!', pharmacy, flag: true };
                });
            }

            resolve(ret);
        });
    })
}

var createOrder = function (pharmacy, medicinePresentation, qtt) {

        var ret;
        var order = new Order();

        order.id_pharmacy = pharmacy._id;
        order.qttNeeded = qtt;
       // order.period_day = "manha"; // FIX ME
        order.medicinePresentation = medicinePresentation;
        order.name_pharmacy = pharmacy.name;
        order.latitude = pharmacy.location.latitude;
        order.longitude = pharmacy.location.longitude;


        // FIX ME -> need to be check if another order was sent
        
        order.save(function (err) {
            if (err) ret = { message: 'ERROR: ' + err };
            ret = { message: 'Order saved!', order };     
            console.log(ret);       
            sendOrder(); // FIX ME
        });
};

var sendOrder = function () {
    // TODO
};