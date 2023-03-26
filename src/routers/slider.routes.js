module.exports = app => {
    const controller = require("../controllers/slider.controller.js");
    const baseUrl = "/api/v1/";
    const component = "master/";
    const modal = "slider";

    app.post(`${baseUrl}${component}${modal}`, controller.add);
    app.put(`${baseUrl}${component}${modal}`, controller.update);
    app.delete(`${baseUrl}${component}${modal}`, controller.delete);
    app.get(`${baseUrl}${component}${modal}`, controller.get);
    app.get(`${baseUrl}${component}${modal}/getid`, controller.getId);
};