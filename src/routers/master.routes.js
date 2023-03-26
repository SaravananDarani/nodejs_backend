var sharedData = require('../data')();
var fs = require('fs');

const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, sharedData.webAdmin.Config.PATHS.ORIGNAL_UPLOAD);
    },
    filename: function (req, file, cb) {
        req.body.SavedFileName = Date.now() + '-' + file.originalname;
        cb(null, req.body.SavedFileName + "")
    }
});

var upload = multer({
    storage: storage
});
module.exports = app => {
    const controller = require("../controllers/master.controller.js");
    const baseUrl = "/api/v1/";
    const component = "master";
    const hostTitle = "/host"
    const titleTitle = "/title"
    const logoTitle = "/logo"

    app.post(`${baseUrl}upload`, upload.single('image'), controller.upload);
    app.get(`${baseUrl}${component}${hostTitle}`, controller.hostFind);
    app.put(`${baseUrl}${component}${hostTitle}`, controller.hostUpdate);
    app.get(`${baseUrl}${component}${hostTitle}/find`, controller.hostFindId);
    app.get(`${baseUrl}${component}${titleTitle}`, controller.titleFind);
    app.put(`${baseUrl}${component}${titleTitle}`, controller.titleUpdate);
    app.get(`${baseUrl}${component}${titleTitle}/find`, controller.titleFindId);
    app.get(`${baseUrl}${component}${logoTitle}`, controller.logoFind);
    app.put(`${baseUrl}${component}${logoTitle}`, controller.logoUpdate);
    app.get(`${baseUrl}${component}${logoTitle}/find`, controller.logoFindId);
};