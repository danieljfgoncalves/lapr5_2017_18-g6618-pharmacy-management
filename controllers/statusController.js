// controllers/statusController.js

var Pharmacy = require('../models/Pharmacy');

// GET /api/status
exports.get_status = function (req, res) {

    Pharmacy.count(function (err, countPharmacies) {
        if (err)  return res.status(500).send(err);
        if (countPharmacies != undefined) return res.status(200).json({"count": countPharmacies});
        return res.status(400).send("Error counting pharmacies on Database!");
    });
}