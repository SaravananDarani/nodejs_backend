module.exports = app => {
    const controller = require("../controllers/company.controller.js");
    const baseUrl = "/api/v1/";
    const component = "company";
    app.get(`${baseUrl}${component}`, controller.findAll);
    app.get(`${baseUrl}${component}/getid`, controller.findById);
    app.post(`${baseUrl}${component}`, controller.create);
    app.put(`${baseUrl}${component}`, controller.update);
    app.delete(`${baseUrl}${component}`, controller.delete);
};