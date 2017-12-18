// controllers/restockController.js

var nodeRestClient = require('node-rest-client');

// GET /api/restock/{pharmacyId}
exports.get_pharmachy_restocks = function(req,res){
    return res.status(200).send("Route GET /api/restock/{pharmacyId} under construction");
}

// GET /api/restock/{pharmacyId}/restock/{id}/
exports.get_restock = function(req,res){
    return res.status(200).send("Route GET /api/restock/{pharmacyId}/restock/{id}/ under construction");
}

// POST /api/restock/{pharmacyId}/restock
exports.post_restock= function(req,res){
    return res.status(200).send("Route POST /api/restock/{pharmacyId}/restock under construction");
}