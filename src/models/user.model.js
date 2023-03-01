const sql = require("../config/db.js");
var sql_api = require('../config/sql_api');
var sqlapi = new sql_api();
const utility = require('../config/utility');
const ValidateApi = require('../config/validate_api');
const { sendEmail } = require('../config/mail/mail');
const valapi = new ValidateApi();
const Q = require('q');

// constructor
const user = (user) => { };

user.create = (req) => {
    var deferred = new Q.defer();
    let requestData = req.body;

    requestData.firstname = typeof requestData.firstname !== "undefined" ? requestData.firstname : '';
    requestData.lastname = typeof requestData.lastname !== "undefined" ? requestData.lastname : '';
    requestData.email = typeof requestData.email !== "undefined" ? requestData.email : '';
    requestData.password = typeof requestData.password !== "undefined" ? requestData.password : '';
    requestData.role = typeof requestData.role !== "undefined" ? requestData.role : 0;
    requestData.status = typeof requestData.status !== "undefined" ? requestData.status : 0;

    var md5Password = utility.encrypt(requestData.password);
    let otp = Math.floor(Math.random() * Math.floor(100000))

    var dataJson = {
        firstname: requestData.firstname,
        lastname: requestData.lastname,
        email: requestData.email,
        password: md5Password,
        otp: otp,
        role: requestData.role,
        status: requestData.status
    };

    var promises = [
        valapi.v_Emp("firstname", dataJson.firstname),
        valapi.v_Emp("lastname", dataJson.lastname)
    ];

    Q.allSettled(promises)
        .then(result => {
            var msg = [];
            for (var i = 0; i < result.length; i++) {
                if (result[i].state == 'rejected') {
                    msg.push(result[i].reason);
                }
            }
            if (msg.length == 0) {
                sqlapi.insertData('INSERT INTO `mst_user` (`email`,`firstname`,`lastname`,`password`,`otp`,`role`,`status`) value (:email,:firstname,:lastname,:password,:otp,:role,:status) ', dataJson)
                    .then(function (results) {
                        htmldb = ` <!DOCTYPE html>
                                <html style="margin: 0; padding: 0;">                               
                                   <head> <title>Hello</title> </head>
                                       <body style="margin: 0; padding: 0;">
                                          <br /> <br />
                                          <div>To authenticate, please use the following One Time Password (OTP): </div>
                                          <br> <br> <div>${otp}</div> <br> <br>
                                          <div>Do not share this OTP with anyone. Aspire takes your account security very seriously. Aspire Customer Service will never ask you to disclose or verify your Aspire password, OTP, credit card, or banking account number. If you receive a suspicious email with a link to update your account information, do not click on the link—instead, report the email to Aspire for investigation.
                                            <br> <br> <br> We hope to see you again soon.</div> <br /> <br />
                                       </body> 
                                 </html> `;

                        requestData.status === 0 ? sendEmail(dataJson.email, dataJson.email, 'hello', htmldb) : "";

                        var reslog = {
                            status: 'success',
                            message: 'User create Successfully'
                        };
                        deferred.resolve(reslog);
                    }, function (err) {
                        var reslog = {};
                        if (err.name == "SequelizeUniqueConstraintError") {
                            reslog = {
                                status: 'failed',
                                message: 'Email Id Already Exists'
                            }
                        } else {
                            reslog = {
                                status: 'failed',
                                message: err
                            };
                        }
                        deferred.reject(reslog);
                    });
            } else {
                var reslog = {
                    status: 'failed',
                    message: "validation issue ",
                    data: msg
                };
                deferred.reject(reslog);
            }
        });
    return deferred.promise;
};

user.updateOtp = (req) => {
    var deferred = new Q.defer();
    let requestData = req.body;
    requestData.otp = typeof requestData.otp !== "undefined" ? requestData.otp : '';
    requestData.email = typeof requestData.email !== "undefined" ? requestData.email : '';

    var dataJson = {
        otp: requestData.otp,
        email: requestData.email,
    };

    var promises = [];

    Q.allSettled(promises)
        .then(result => {
            var msg = [];
            for (var i = 0; i < result.length; i++) {
                if (result[i].state == 'rejected') {
                    msg.push(result[i].reason);
                }
            }
            if (msg.length == 0) {
                sqlapi.selectData('SELECT * FROM `mst_user` WHERE  otp = :otp AND email = :email AND `status`=0', dataJson)

                    .then(function (db) {
                        dataJson.db = db;
                        var msg = "";
                        var promiseArray = [];
                        if (dataJson.db.length) {
                            promiseArray.push(sqlapi.updateData('UPDATE `mst_user` SET `status`=1   WHERE otp = :otp AND `status`=0', dataJson))
                        }
                        return Q.allSettled(promiseArray);
                    })
                    .then(function (results) {

                        if (dataJson.db.length) {
                            console.log('true')
                            var reslog = {
                                status: 'success',
                                message: 'User Active Successfully'
                            };
                            deferred.resolve(reslog);
                        } else {
                            console.log('false')
                            var reslog = {
                                status: 'failed',
                                message: ' OTP  Invalided'
                            };
                            deferred.resolve(reslog);
                        }


                    }, function (err) {
                        var reslog = {};
                        if (err.name == "SequelizeUniqueConstraintError") {
                            reslog = { status: 'false', message: 'Email Id   Already Exists' }
                        } else {
                            reslog = {
                                status: 'failed',
                                message: err
                            };
                        }
                        deferred.reject(reslog);
                    });
            } else {
                var reslog = {
                    status: 'failed',
                    message: msg
                };
                deferred.reject(reslog);
            }
        });
    return deferred.promise;
};

user.resendOtp = (req) => {
    var deferred = new Q.defer();
    let requestData = req.body;
    requestData.email = typeof requestData.email !== "undefined" ? requestData.email : '';

    var dataJson = {
        email: requestData.email,
    };
    var promises = [];

    Q.allSettled(promises)
        .then(result => {
            var msg = [];
            for (var i = 0; i < result.length; i++) {
                if (result[i].state == 'rejected') {
                    msg.push(result[i].reason);
                }
            }
            if (msg.length == 0) {
                sqlapi.selectData('SELECT * FROM `mst_user` WHERE  email = :email AND `status`=0', dataJson)


                    .then(function (results) {
                        htmldb = ` <!DOCTYPE html>
                                <html style="margin: 0; padding: 0;">                               
                                   <head> <title>Hello</title> </head>
                                       <body style="margin: 0; padding: 0;">
                                          <br /> <br />
                                          <div>To authenticate, please use the following One Time Password (OTP): </div>
                                          <br> <br> <div>${results.otp}</div> <br> <br>
                                          <div>Do not share this OTP with anyone. Aspire takes your account security very seriously. Aspire Customer Service will never ask you to disclose or verify your Aspire password, OTP, credit card, or banking account number. If you receive a suspicious email with a link to update your account information, do not click on the link—instead, report the email to Aspire for investigation.
                                            <br> <br> <br> We hope to see you again soon.</div> <br /> <br />
                                       </body> 
                                 </html> `;

                        sendEmail(dataJson.email, dataJson.email, 'hello', htmldb)

                        if (results.length) {
                            console.log('true')
                            var reslog = {
                                status: 'success',
                                message: 'Otp Resend Successfully'
                            };
                            deferred.resolve(reslog);
                        } else {
                            console.log('false')
                            var reslog = {
                                status: 'failed',
                                message: ' OTP  Invalided'
                            };
                            deferred.resolve(reslog);
                        }

                    }, function (err) {
                        var reslog = {};
                        if (err.name == "SequelizeUniqueConstraintError") {
                            reslog = { status: 'false', message: 'Email Id   Already Exists' }
                        } else {
                            reslog = {
                                status: 'failed',
                                message: err
                            };
                        }
                        deferred.reject(reslog);
                    });
            } else {
                var reslog = {
                    status: 'failed',
                    message: msg
                };
                deferred.reject(reslog);
            }
        });
    return deferred.promise;
};

user.forgotpassword = (req) => {
    var deferred = new Q.defer();
    let requestData = req.body;
    requestData.email = typeof requestData.email !== "undefined" ? requestData.email : '';

    var dataJson = {
        email: requestData.email,
    };
    var promises = [];

    Q.allSettled(promises)
        .then(result => {
            var msg = [];
            for (var i = 0; i < result.length; i++) {
                if (result[i].state == 'rejected') {
                    msg.push(result[i].reason);
                }
            }
            if (msg.length == 0) {
                sqlapi.selectData('SELECT * FROM `mst_user` WHERE  email = :email ', dataJson)

                    .then(function (results) {
                        let md5Passwords = utility.decrypt(results[0].password)
                        htmldb = ` <!DOCTYPE html>
                                <html style="margin: 0; padding: 0;">                               
                                   <head> <title>Hello</title> </head>
                                       <body style="margin: 0; padding: 0;">
                                          <br /> <br />
                                          <div>To authenticate, please use the following Password : </div>
                                          <br> <br> <div>${md5Passwords}</div> <br> <br>
                                          <div>
                                          Aspire takes your account security very seriously. Aspire Customer Service will never ask you to disclose or verify your Aspire password, OTP, credit card, or banking account number. If you receive a suspicious email with a link to update your account information, do not click on the link—instead, report the email to Aspire for investigation. <br> <br> <br> We hope to see you again soon.</div> <br /> <br />
                                       </body>
                                 </html> `;

                        sendEmail(dataJson.email, dataJson.email, 'hello', htmldb)

                        if (results.length) {
                            var reslog = {
                                status: 'success',
                                message: 'Password send Successfully'
                            };
                            deferred.resolve(reslog);
                        } else {
                            var reslog = {
                                status: 'failed',
                                message: ' OTP  Invalided'
                            };
                            deferred.resolve(reslog);
                        }

                    }, function (err) {
                        var reslog = {};
                        if (err.name == "SequelizeUniqueConstraintError") {
                            reslog = { status: 'false', message: 'Email Id   Already Exists' }
                        } else {
                            reslog = {
                                status: 'failed',
                                message: err
                            };
                        }
                        deferred.reject(reslog);
                    });
            } else {
                var reslog = {
                    status: 'failed',
                    message: msg
                };
                deferred.reject(reslog);
            }
        });
    return deferred.promise;
};

user.login = (req) => {
    var deferred = new Q.defer();
    let requestData = req.body;
    try {
        var md5Password = utility.encrypt(requestData.password);
        // var md5Passwords = utility.decrypt(requestData.password);
        // console.log(md5Passwords);
        console.log("2", requestData)
        if (requestData.hasOwnProperty('email') && typeof requestData.email != "undefined") {
            requestData.email = requestData.email.toLowerCase();
        }
        var dataJson = {
            username: requestData.email,
            password: md5Password
        };

        //Validate fields before proceeding the operation
        var promises = [
            valapi.v_Eml("username", dataJson.username),
            valapi.v_Emp("password", dataJson.password)
        ];

        Q.allSettled(promises).then(function (results) {
            var msg = [];
            var promCount = results.length;
            for (var i = 0; i < promCount; i++) {
                if (results[i].state == "rejected") {
                    msg.push(results[i].reason); //catch all rejected fields
                }
            }
            if (msg.length == 0) {
                console.log("True");
                var sqlQry1 = '',
                    err_msg = '';
                sqlQry1 = 'SELECT * FROM mst_user   WHERE email= :username AND password = :password';

                err_msg = "Email ID / Password Incorrect";
                var error_code = '';
                sqlapi.selectData(sqlQry1, dataJson)
                    .then(function (result) {
                        if (result.length > 0) {
                            var reslog = {
                                status: 'success',
                                message: "Wellcome Login Successfully",
                                data: result[0],
                            };
                            // utility.getLog().info(reslog);
                            deferred.resolve(reslog);

                        } else {
                            var reslog = {
                                status: 'failed',
                                error_code: "404",
                                message: err_msg
                            };
                            // utility.getLog().info(reslog);
                            deferred.reject(reslog);
                            throw new Error('abort promise chain');
                        }
                    })


            } else {
                var reslog = {
                    status: 'failed',
                    message: msg
                };
                // utility.getLog().info(reslog);
                deferred.reject(reslog);
            }
        });
    } catch (err) {
        var reslog = {
            status: 'failed',
            message: err + ""
        };
        // utility.getLog().info(reslog);
        deferred.reject(reslog);
    }
    return deferred.promise;
};

user.findById = (userId, result) => {
    sqlapi.selectData(`SELECT * FROM mst_user WHERE id = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found user with the id
        result({ kind: "not_found" }, null);
    });
};

user.getAll = (requestData) => {
    var deferred = new Q.defer();
    try {
        requestData = typeof requestData !== "undefined" ? requestData : '';
        var dataJson = {};

        sqlapi.selectData('SELECT * FROM `mst_user`  WHERE `id` != "0" ORDER BY `id` DESC ', dataJson)
            .then(function (results) {
                var finalData = results;
                var reslog = {
                    status: 'success',
                    message: finalData.length > 0 ? 'user listed Successfully' : 'Data not found',
                    data: finalData,

                };
                deferred.resolve(reslog);
            }).catch(function (err) {
                var reslog = {
                    status: 'error',
                    message: err
                };
                deferred.reject(reslog);
            });
    } catch (err) {
        var reslog = {
            status: 'error',
            message: err
        };
        deferred.reject(reslog);
    }
    return deferred.promise;

};

user.getid = (req) => {

    let query = req.query.id;
    var deferred = new Q.defer();
    try {
        query = typeof query !== "undefined" ? query : '';
        var dataJson = { id: query };

        sqlapi.selectData('SELECT * FROM `mst_user` WHERE id=:id ', dataJson)
            .then(function (results) {
                var finalData = results;
                var reslog = {
                    status: 'success',
                    message: finalData.length > 0 ? 'user listed Successfully' : 'Data not found',
                    data: finalData[0],

                };
                deferred.resolve(reslog);
            }).catch(function (err) {
                var reslog = {
                    status: 'error',
                    message: err
                };
                deferred.reject(reslog);
            });
    } catch (err) {
        var reslog = {
            status: 'error',
            message: err
        };
        deferred.reject(reslog);
    }
    return deferred.promise;
};

user.delete = (req) => {
    var deferred = new Q.defer();
    let requestData = req.body;
    requestData.id = typeof requestData.id !== "undefined" ? requestData.id : '';

    var dataJson = {
        id: requestData.id
    };

    var promises = [
        valapi.v_Emp('id', dataJson.id)
    ];

    Q.allSettled(promises)
        .then(result => {
            var msg = [];
            for (var i = 0; i < result.length; i++) {
                if (result[i].state == 'rejected') {
                    msg.push(result[i].reason);
                }
            }
            if (msg.length == 0) {
                sqlapi.deleteData('DELETE FROM mst_user WHERE id = :id', dataJson)
                    .then(function (results) {
                        var reslog = {
                            status: 'success',
                            message: 'User Deleted Successfully'
                        };
                        deferred.resolve(reslog);
                    }, function (err) {
                        var reslog = {
                            status: 'error',
                            message: err
                        };
                        deferred.reject(reslog);
                    });
            } else {
                var reslog = {
                    status: 'error',
                    message: msg
                };
                deferred.reject(reslog);
            }
        });
    return deferred.promise;
}


user.update = (req) => {
    console.log(req)
    var deferred = new Q.defer();
    let requestData = req.body;

    requestData.id = typeof requestData.id !== "undefined" ? requestData.id : '';
    requestData.firstname = typeof requestData.firstname !== "undefined" ? requestData.firstname : '';
    requestData.lastname = typeof requestData.lastname !== "undefined" ? requestData.lastname : '';
    requestData.email = typeof requestData.email !== "undefined" ? requestData.email : 0;

    var dataJson = {
        id: requestData.id,
        firstname: requestData.firstname,
        lastname: requestData.lastname,
        email: requestData.email,
    };

    var promises = [
        valapi.v_Emp("firstname", dataJson.firstname),
        valapi.v_Emp("lastname", dataJson.lastname),
        valapi.v_Emp("email", dataJson.email),
    ];

    Q.allSettled(promises)
        .then(result => {
            var msg = [];
            for (var i = 0; i < result.length; i++) {
                if (result[i].state == 'rejected') {
                    msg.push(result[i].reason);
                }
            }
            if (msg.length == 0) {
                sqlapi.updateData('UPDATE `mst_user` SET `firstname` =:firstname ,`lastname`=:lastname ,`email`=:email WHERE id = :id', dataJson)
                    .then(function (results) {
                        var reslog = {
                            status: 'success',
                            message: 'Updated Successfully'
                        };
                        deferred.resolve(reslog);
                    }, function (err) {
                        var reslog = {};
                        if (err.name == "SequelizeUniqueConstraintError") {
                            reslog = {
                                status: 'failed',
                                message: 'Email Id Already Exists'
                            }
                        } else {
                            reslog = {
                                status: 'failed',
                                message: err
                            };
                        }
                        deferred.reject(reslog);
                    });
            } else {
                var reslog = {
                    status: 'failed',
                    message: "validation issue ",
                    data: msg
                };
                deferred.reject(reslog);
            }
        });
    return deferred.promise;
};
user.updateById = (id, user, result) => {
    sql.query(
        "UPDATE mst_user SET email = ?, name = ?, active = ? WHERE id = ?",
        [user.email, user.name, user.active, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found user with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated user: ", { id: id, ...user });
            result(null, { id: id, ...user });
        }
    );
};

user.remove = (id, result) => {
    sql.query("DELETE FROM mst_user WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found user with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted user with id: ", id);
        result(null, res);
    });
};

user.removeAll = result => {
    sql.query("DELETE FROM mst_user", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} users`);
        result(null, res);
    });
};

module.exports = user;