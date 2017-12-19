// helpers/medicinesRequests.js

var config = require('../config');
var Client = require('node-rest-client').Client;
var client = new Client();

//-----------------NOT TESTED - Auth0 isn´t availabe
exports.getTokenMedicineAPI=function(){
    //TODO
}

//presentation from Medicines backend
exports.getPresentation=function(id){
    if(id==null)return;

    return new Promise( (resolve, reject) => {
           
        var url=config.medicines_backend.urlPresentations + id + '/detailed/';

        client.get(url,args, function(data){
            resolve(data);
    })
  })
}

//presentations from Medicines backend
exports.getPresentations=function(){

    return new Promise( (resolve, reject) => {
           
        var url=config.medicines_backend.urlPresentations;

        client.get(url,args, function(data){
            resolve(data);
    })
  })
}

//presentations detailed from Medicines backend
exports.getPresentationsDetailed=function(){
    
        return new Promise( (resolve, reject) => {
               
            var url=config.medicines_backend.urlPresentationsDetailed;
    
            client.get(url,args, function(data){
                resolve(data);
        })
      })
    }