const company = require("../models/master.model");

exports.upload = (req, res) => {
    company.upload(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
};
exports.hostFind = (req, res) => {
    company.hostFind(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
};
exports.hostFindId = (req, res) => {
    company.hostFindId(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
};

exports.hostUpdate = (req, res) => {
    company.hostUpdate(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
};

exports.titleFind = (req, res) => {
    company.titleFind(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
};
exports.titleFindId = (req, res) => {
    company.titleFindId(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
};

exports.titleUpdate = (req, res) => {
    company.titleUpdate(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
};

exports.logoFind = (req, res) => {
    company.logoFind(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
};
exports.logoFindId = (req, res) => {
    company.logoFindId(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
};

exports.logoUpdate = (req, res) => {
    company.logoUpdate(req).then((result) => {
        res.send(result);
    }, (result) => {
        res.send(result)
    });
};
