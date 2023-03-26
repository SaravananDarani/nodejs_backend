const models = require("../models/menu.model");

exports.add = (req, res) => {
    models.add(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
};

exports.update = (req, res) => {
    models.update(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
};

exports.delete = (req, res) => {
    models.delete(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
};
exports.get = (req, res) => {
    models.get(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
};
exports.getId = (req, res) => {
    models.getId(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
}; 