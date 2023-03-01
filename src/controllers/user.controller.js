const user = require("../models/user.model");

// Retrieve all user from the database.
exports.findAll = (req, res) => {
    user.getAll(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
};

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    user.create(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
};

exports.delete = (req, res) => {
    user.delete(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
};

exports.update = (req, res) => {
    user.update(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
};

exports.getid = (req, res) => {
    user.getid(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
};

exports.updateOtp = (req, res) => {
    user.updateOtp(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
};

exports.resendOtp = (req, res) => {
    user.resendOtp(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
};

exports.forgotpassword = (req, res) => {
    user.forgotpassword(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
};

exports.login = (req, res) => {
    user.login(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
};