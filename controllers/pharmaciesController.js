// controllers/pharmaciesController.js

var Client = require('node-rest-client').Client;
var client=new Client();
var config=require('../config');
var async= require('async');
var Promise= require('bluebird');
var Pharmacy = require('../models/pharmacy');
var mongoose=require('mongoose');
mongoose.Promise = Promise;

// GET /api/pharmacy
exports.get_pharmacies= function(req,res){

    Pharmacy.find(), function(err, pharmacies){
        if(err)
            return res.status(500).send(err);
        if(pharmacies!= undefined){
            res.status(200).json(pharmacies);
        }else{
            return res.status(400).send("There aren´t registered pharmacies.");
        }
    }
}

// POST /api/pharmacy
exports.post_pharmacy= function(req, res){

    var pharmacy=new Pharmacy();
    
    pharmacy.name = req.body.name;
    
        //finding location variables
        var location= req.body.location;
    
        if(location==undefined){
            var latitude=req.body.latitude;
            var longitude=req.body.longitude;
            var locationCreated= new Location({
                latitude:latitude,
                longitude:longitude
            });
            pharmacy.location=locationCreated;
        }else{
            pharmacy.location= req.body.location;
        }
    
        async.each(req.body.stocks, function(stock, callback){
            var idStock= stock.id_stock;
            var quantity=stock.quantity;
            var idPresentation=stock.id_presentation;
    
            if(idPresentation==undefined){
                idPresentation=stock.presentation.id_presentation;
            }
    
            if(idPresentation!==null){
                var stock;
    
                //helper getTokenMedicamentosAPI
                var token=getTokenMedicamentosAPI()
                    .then(token => getPresentation(idPresentation, req, token))
                    .then(presentation=> {
                        stock= fillStock(quantity, presentation);
                        pharmacy.stocks.push(stock);
                        callback();
                    })
                }
            }, function(err){
             
                pharmacy.save(function(err){
                    if(err) return res.status(500).send(err);
                    res.status(201).json({message:'Pharmacy Created'})
                })
            });
}

// GET /api/pharmacy/:id
exports.get_pharmacy= function(req,res){

    Pharmacy.findById(req.params.id, function(err,pharmacy) {
        if(err) return res.status(500).send(err);
        if(!pharmacy) return res.status(404).send("There isn´t a pharmacy with the given ID.");
        return res.status(200).send(pharmacy);
    })
}

// GET /api/pharmacy/:id/stock/:id
exports.get_pharmacy_stock= function(req,res){

    Pharmacy.findById(req.params.pharmacy_id, function(err, pharmacy){
        if(err) return res.status(500).send(err);
        if(!pharmacy) return res.status(404).send('There isn´t a pharmacy with the ginve ID.');

        var stock= pharmacy.stocks.find(s=> s.id===req.params.id);
        if(!stock) return res.status(404).send('There isn´t stock with the given ID in pharmacy.');
        return res.status(200).send(stock);
    })
}