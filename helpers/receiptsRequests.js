// helpers/receiptsRequests.js

//prescriptions from ReceiptsMedicine backend
exports.getPrescription = function (args, prescriptionId){
    if(prescriptionId== null) return;

    return new Promise((resolve, reject) => {
        
        var url = config.receipts_backend.url.concat("/Prescriptions/").concat(prescriptionId);
        client.get(url, args, (data, response) => {
            resolve(data);
        });
    })
}