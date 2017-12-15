// helpers/medicinesRequests.js

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