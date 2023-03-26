module.exports = app => {
    const controller = require("../controllers/abouts.controller.js");
    const baseUrl = "/api/v1/";
    const component = "master/";
    const modal = "abouts";

    app.put(`${baseUrl}${component}${modal}`, controller.update);
    app.delete(`${baseUrl}${component}${modal}`, controller.delete);
    app.get(`${baseUrl}${component}${modal}`, controller.get);
    app.get(`${baseUrl}${component}${modal}/getid`, controller.getId);
};