module.exports = app => {
    const user = require("../controllers/user.controller.js");

    app.get("/api/v1/user", user.findAll);
    app.post("/api/v1/user", user.create);
    app.put("/api/v1/user", user.update);
    app.get("/api/v1/user/getid", user.getid);
    app.post("/api/v1/user/delete", user.delete);
    app.post("/api/v1/user/updateotp", user.updateOtp);
    app.post("/api/v1/user/resendotp", user.resendOtp);
    app.post("/api/v1/user/forgotpassword", user.forgotpassword);
    app.post("/api/v1/user/login", user.login);

};