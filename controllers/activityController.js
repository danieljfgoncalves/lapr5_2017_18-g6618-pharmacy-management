// controllers/activityController.js

var nodeRestClient = require('node-rest-client');
var ActivityLog = require('../models/ActivityLog');
var Sale = require('../models/Sale');

// GET /api/pharmaciesLogs
exports.get_logs = function (req, res) {
    Sale.find(function (err, sales) {
        if (err) return res.status(500).send(err);
        if (sales != undefined) return res.status(200).json(sales);

        return res.status(400).send("There aren´t registered logs.");

    });
}

// GET /api/pharmaciesLogs/{id}
exports.get_log = function (req, res) {

    Sale.findById(req.params.id, function (err, sale) {
        if (err) return res.status(500).send(err);
        if (!sale) return res.status(404).send("There isn´t a log with the given ID.");
        return res.status(200).send(sale);
    })
}

// GET /api/pharmaciesLogs/date/{?dateI}
exports.get_log_date = function (req, res) {
    Sale.find(function (err, logs) {
        if (err) return res.status(500).send(err);
        if (logs  != undefined){ 
           
            var input=new Date(req.params.dateI).toISOString().substring(0,10);    
            var logs_date = [];

            for (let i = 0; i < logs.length; i++) {
                var format=new Date(logs[i].date).toISOString().substring(0,10);
                if (format === input) {
                   logs_date.push(logs[i]);
                }
            }

            return res.status(200).json(logs_date);
        } 

        return res.status(400).send("There aren´t registered logs on the entered date.");
    });
}

// GET /api/pharmaciesLogs/{date}/since
exports.get_log_sinceDate = function (req, res) {
    Sale.find(function (err, logs) {
        if (err) return res.status(500).send(err);
        if (logs  != undefined){ 
            var input=new Date(req.params.dateI).toISOString().substring(0,10);    
            var logs_date = [];

            for (let i = 0; i < logs.length; i++) {
                 var format=new Date(logs[i].date).toISOString().substring(0,10);
                if (input <= format) {
                   logs_date.push(logs[i]);
                }
            }

            return res.status(200).json(logs_date);
        } 

        return res.status(400).send("There aren´t registered logs on the entered date.");
    });
}

