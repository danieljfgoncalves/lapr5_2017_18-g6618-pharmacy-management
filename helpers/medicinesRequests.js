// helpers/medicinesRequests.js

var config = require('../config');
var Client = require('node-rest-client').Client;
var client = new Client();

//-----------------NOT TESTED - API isn´t availabe
exports.getTokenMedicineAPI=function(){
    return new Promise((resolve,reject) => {
        var options= {
            method: 'POST',
            url: config.urlMedicinesToken,
            headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json'
            },
            body: config.loginMedicines
        };

        request(options, function(err, response, body){
            if(err) throw new Error(err);
            var aux=JSON.parse(body);
            resolve(aux.token);
        })
    })
}

//----------------NOT TESTED - API isn´t available
//medicine from Medicines backend
exports.getMedicine= function(args, medicineId){
    if(medicineId==null) return;

    return new Promise((resolve,reject)=> {
        var url= config.medicines_backend.url.concat("/Medicines/").concat(medicineId);
        client.get(url, args, (data,response)=>{
            resolve(data);
        });
    })
}

//----------------NOT TESTED - API isn´t available
//presentation from Medicines backend
exports.getPresentation=function(id,presentation, token){
    return new Promise( (resolve, reject) => {
        var bearer= "Bearer " + token;
        
        var url=config.urlPresentationByID + id;

        var args= {
            headers: {
                "Content-Type": "application/json",
                "Authorization": bearer
            }
        }
        client.get(url,args, function(data,response){
            resolve(data);
        })
    })
}