const company = require("../models/company.model");

// Retrieve all user from the database.
exports.findAll = (req, res) => {
    company.getAll(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
};
exports.findById = (req, res) => {
    company.findById(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
};

exports.create = (req, res) => {
    company.create(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
};

exports.update = (req, res) => {
    company.update(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
};
exports.delete = (req, res) => {
    company.delete(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
};