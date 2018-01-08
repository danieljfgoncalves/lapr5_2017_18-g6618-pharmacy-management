// services/UpdateStockService

var config = require('../config');
var Pharmacy = require('../models/Pharmacy');
var Order = require('../models/Order');
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;
var math = require('mathjs');
var postorder = require('../helpers/ordersRequests');
var medicinesRequests = require('../helpers/medicinesRequests');

exports.updateStock = function (restock, type, medicinesToken) {
    return new Promise((resolve, reject) => {

        var ret;
        Pharmacy.findById(restock.id_pharmacy, function (err, pharmacy) {

            if (err) {
                ret = { message: 'ERROR: ' + err };
                resolve(ret);
            }
            if (pharmacy == undefined) {
                ret = { message: "There aren´t registered pharmacies." };
                resolve(ret);
            } 
            if(restock.quantity <= 0){
                ret = { message: 'It was not possible finish operation! Negative quantity!' };
                resolve(ret);
            }

            var stockExists = false;
            for (let i = 0; i < pharmacy.stocks.length; i++) {
                // verify if referenced stock is created in pharmacy and update
                if (pharmacy.stocks[i].medicinePresentation.id_medicine == restock.medicinePresentation.id_medicine
                    && pharmacy.stocks[i].medicinePresentation.id_presentation == restock.medicinePresentation.id_presentation) {

                    restock.medicinePresentation.drug = pharmacy.stocks[i].medicinePresentation.drug;
                    restock.medicinePresentation.medicine = pharmacy.stocks[i].medicinePresentation.medicine;
                    restock.medicinePresentation.form = pharmacy.stocks[i].medicinePresentation.form;
                    restock.medicinePresentation.concentration = pharmacy.stocks[i].medicinePresentation.concentration;
                    restock.medicinePresentation.packageQtt = pharmacy.stocks[i].medicinePresentation.packageQtt;

                    var quant = parseInt(pharmacy.stocks[i].quantity);
                    var final_quant;

                    if (type == config.add){
                        final_quant = math.eval(parseInt(quant) + parseInt(restock.quantity));
                    } else{
                        final_quant = math.eval(parseInt(quant) - parseInt(restock.quantity));
                    }
                        
                    if (final_quant < 0) {
                        ret = { message: 'It was not possible finish operation! Insufficient Stock!' };
                        resolve(ret);
                    } else if (final_quant < pharmacy.stocks[i].minQuantity) {

                        var qtt = math.eval(parseInt(pharmacy.stocks[i].minQuantity) 
                                            * parseInt(config.multipStockFactor));

                        createOrder(pharmacy, restock.medicinePresentation, qtt);
                    }
                    pharmacy.stocks[i].quantity = final_quant;
                    stockExists = true;
                    break;
                }
            }

            if (stockExists) {
                pharmacy.save(function (err) {
                    if (err) ret = { message: 'ERROR' + err };
                    ret = { 
                        message: 'Stock updated!',
                        restock: restock,
                        pharmacy };
                    resolve(ret);
                });
            }
            else {
                medicinesRequests.getPresentation(medicinesToken, restock.medicinePresentation.id_presentation)
                .then(presentation => {

                    var medicineName;
                    presentation.medicines.forEach(med => {
                        if (med.id == restock.medicinePresentation.id_medicine) {
                            medicineName = med.name;
                        }
                    });

                    if (!medicineName) {
                        ret = { message: 'The given medicine does not belongs to the given prescription'};
                        resolve(ret);
                    }

                    var stock = {
                        quantity: restock.quantity,
                        medicinePresentation: {
                            drug: presentation.drug.name,
                            medicine: medicineName,
                            form: presentation.form,
                            concentration: presentation.concentration,
                            packageQtt: presentation.packageQuantity,
                            id_medicine: restock.medicinePresentation.id_medicine,
                            id_presentation: restock.medicinePresentation.id_presentation
                        }
                    };
                    pharmacy.stocks.push(stock);

                    pharmacy.save(function (err) {
                        if (err) ret = { message: 'ERROR' + err };
                        ret = { 
                            message: 'Stock updated!', 
                            restock: stock,
                            pharmacy 
                        };
                        resolve(ret);
                    });
                });
            }

        });
    })
}

var createOrder = function (pharmacy, medicinePresentation, qtt) {

        var ret;
        var order = new Order();

        order.id_pharmacy = pharmacy._id;
        order.qttNeeded = qtt;
        if(pharmacy.timeRestriction == undefined){
            order.period_day = "0";
        } else {
            order.period_day = pharmacy.timeRestriction;
        }        
        order.medicinePresentation = medicinePresentation;
        order.name_pharmacy = pharmacy.name;
        order.latitude = pharmacy.location.latitude;
        order.longitude = pharmacy.location.longitude;


        // FIX ME -> need to be check if another order was sent
        
        order.save(function (err) {
            if (err) ret = { message: 'ERROR: ' + err };
            ret = { message: 'Order saved!', order };     
            console.log(ret);       
            sendOrder(order);
        });
};

var sendOrder = function (order) {
    var ord = {
        "requestDate": order.date, 
        "itemName": order.medicinePresentation.medicine, 
        "form": order.medicinePresentation.form, 
        "quantity": order.qttNeeded, 
        "pharmacy": order.name_pharmacy, 
        "latitude": order.latitude, 
        "longitude": order.longitude, 
        "timeRestriction": order.period_day
    }
    var or = JSON.stringify(ord);
    var o = postorder.postOrder(or);
    console.log(o);
};