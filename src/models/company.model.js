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

    requestData.companyname = typeof requestData.companyname !== "undefined" ? requestData.companyname : '';
    requestData.alaisename = typeof requestData.alaisename !== "undefined" ? requestData.alaisename : '';
    requestData.address = typeof requestData.address !== "undefined" ? requestData.address : '';
    requestData.mobile = typeof requestData.mobile !== "undefined" ? requestData.mobile : '';
    requestData.email = typeof requestData.email !== "undefined" ? requestData.email : 0;
    requestData.status = typeof requestData.status !== "undefined" ? requestData.status : 0;
    requestData.addedby = typeof requestData.addedby !== "undefined" ? requestData.addedby : 0;

    var dataJson = {
        companyname: requestData.companyname,
        alaisename: requestData.alaisename,
        address: requestData.address,
        mobile: requestData.mobile,
        email: requestData.email,
        status: requestData.status,
        addedby: requestData.addedby,
    };

    var promises = [
        valapi.v_Emp("companyname", dataJson.companyname),
        valapi.v_Emp("alaisename", dataJson.alaisename),
        valapi.v_Emp("address", dataJson.address),
        valapi.v_Emp("mobile", dataJson.mobile),
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
                sqlapi.insertData('INSERT INTO `mst_company` (`companyname`,`alaisename`,`address`,`mobile`,`email`,`status`,`addedby`) value (:companyname,:alaisename,:address,:mobile,:email,:status,:addedby)', dataJson)
                    .then(function (results) {
                        var reslog = {
                            status: 'success',
                            message: 'Create Successfully'
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



user.update = (req) => {
    console.log(req)
    var deferred = new Q.defer();
    let requestData = req.body;

    requestData.id = typeof requestData.id !== "undefined" ? requestData.id : '';
    requestData.companyname = typeof requestData.companyname !== "undefined" ? requestData.companyname : '';
    requestData.alaisename = typeof requestData.alaisename !== "undefined" ? requestData.alaisename : '';
    requestData.address = typeof requestData.address !== "undefined" ? requestData.address : '';
    requestData.mobile = typeof requestData.mobile !== "undefined" ? requestData.mobile : '';
    requestData.email = typeof requestData.email !== "undefined" ? requestData.email : 0;
    requestData.status = typeof requestData.status !== "undefined" ? requestData.status : 0;
    requestData.addedby = typeof requestData.addedby !== "undefined" ? requestData.addedby : 0;

    var dataJson = {
        id: requestData.id,
        companyname: requestData.companyname,
        alaisename: requestData.alaisename,
        address: requestData.address,
        mobile: requestData.mobile,
        email: requestData.email,
        status: requestData.status,
        addedby: requestData.addedby,
    };

    var promises = [
        valapi.v_Emp("companyname", dataJson.companyname),
        valapi.v_Emp("alaisename", dataJson.alaisename),
        valapi.v_Emp("address", dataJson.address),
        valapi.v_Emp("mobile", dataJson.mobile),
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
                sqlapi.updateData('UPDATE `mst_company` SET `companyname` =:companyname ,`alaisename`=:alaisename,`address`=:address ,`mobile`=:mobile,`email`=:email WHERE id = :id', dataJson)
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
user.findById = (req) => {
    let id = req.query.id
    var deferred = new Q.defer();

    try {
        requestData = typeof requestData !== "undefined" ? requestData : '';
        var dataJson = {
            id: id
        };
        sqlapi.selectData(`SELECT * FROM mst_company WHERE  id=:id`, dataJson)
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

user.getAll = (requestData) => {
    var deferred = new Q.defer();
    try {
        requestData = typeof requestData !== "undefined" ? requestData : '';
        var dataJson = {};

        sqlapi.selectData('SELECT * FROM `mst_company` WHERE `id` != "0" ORDER BY `id` DESC ', dataJson)
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

    let query = req.query.getid;
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
    let query = req.query.id;
    var deferred = new Q.defer();

    query = typeof query !== "undefined" ? query : '';
    var dataJson = { id: query };
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
                sqlapi.deleteData('DELETE FROM mst_company WHERE id = :id', dataJson)
                    .then(function (results) {
                        var reslog = {
                            status: 'success',
                            message: '  Deleted Successfully'
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
module.exports = user;