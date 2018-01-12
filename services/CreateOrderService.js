var Order = require('../models/Order');
var postorder = require('../helpers/ordersRequests');

exports.createOrder = function (pharmacy, medicinePresentation, qtt) {

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
            //console.log(ret);       
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
    //console.log(o);
};