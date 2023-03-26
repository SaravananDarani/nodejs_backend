const sql = require("../config/db.js");
var sql_api = require('../config/sql_api');
var sqlapi = new sql_api();
const utility = require('../config/utility');
const ValidateApi = require('../config/validate_api');
const valapi = new ValidateApi();
const Q = require('q');

// constructor
const models = (models) => { };

models.add = (req) => {
    var deferred = new Q.defer();
    let requestData = req.body;
    requestData.name = typeof requestData.name !== "undefined" ? requestData.name : '';
    requestData.title = typeof requestData.title !== "undefined" ? requestData.title : '';
    requestData.subtitle = typeof requestData.subtitle !== "undefined" ? requestData.subtitle : '';
    requestData.img = typeof requestData.img !== "undefined" ? requestData.img : '';
    requestData.webid = typeof requestData.webid !== "undefined" ? requestData.webid : '';

    var dataJson = {
        name: requestData.name,
        title: requestData.title,
        subtitle: requestData.subtitle,
        img: requestData.img,
        webid: requestData.webid,
    };

    var promises = [

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
                sqlapi.insertData('INSERT INTO mst_contact (name,title,subtitle,img,status,webid) VALUES (:name,:title,:subtitle,:img,1,:webid)', dataJson)
                    .then(function (results) {
                        if (results.length > 0) {
                            var reslog = {
                                status: 'success',
                                message: '  Inserted successfully'
                            };
                            deferred.resolve(reslog);
                        } else {
                            var reslog = {
                                status: 'false',
                                message: '  not inserted'
                            };
                            deferred.reject(reslog);
                        }
                    }).catch(function (err) {
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
        })
    return deferred.promise;
};
models.update = (req) => {
    var deferred = new Q.defer();
    let requestData = req.body;
    requestData.title = typeof requestData.title !== "undefined" ? requestData.title : '';
    requestData.name = typeof requestData.name !== "undefined" ? requestData.name : '';
    requestData.webid = typeof requestData.webid !== "undefined" ? requestData.webid : '';
    requestData.id = typeof requestData.id !== "undefined" ? requestData.id : '';

    var dataJson = {
        title: requestData.title,
        name: requestData.name,
        webid: requestData.webid,
        dataId: requestData.id,
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
                if (dataJson.dataId) {
                    sqlapi.updateData('UPDATE mst_contact SET title =:title,img=:name WHERE id = :dataId', dataJson)
                        .then(function (results) {
                            var reslog = {
                                status: 'success',
                                message: ' Updated Successfully'
                            };
                            deferred.resolve(reslog);
                        }, function (err) {
                            var reslog = {};
                            if (err.name == "SequelizeUniqueConstraintError") {
                                reslog = { status: 'false', message: 'Certificate Name   Already Exists' }
                            } else {
                                reslog = {
                                    status: 'false',
                                    message: err
                                };
                            }
                            deferred.reject(reslog);
                        });
                } else {
                    sqlapi.insertData('INSERT INTO mst_contact(title,img,status,webid) VALUES (:title,:name,1,:webid)', dataJson)
                        .then(function (results) {
                            if (results.length > 0) {
                                var reslog = {
                                    status: 'success',
                                    message: '  Inserted successfully'
                                };
                                deferred.resolve(reslog);
                            } else {
                                var reslog = {
                                    status: 'false',
                                    message: '  not inserted'
                                };
                                deferred.reject(reslog);
                            }
                        }).catch(function (err) {
                            var reslog = {
                                status: 'error',
                                message: err
                            };
                            deferred.reject(reslog);
                        });
                }
            } else {
                var reslog = {
                    status: 'false',
                    message: msg
                };
                deferred.reject(reslog);
            }
        });
    return deferred.promise;
}

models.delete = (req) => {
    var deferred = new Q.defer();
    let requestData = req.query.id;
    requestData = typeof requestData !== "undefined" ? requestData : '';

    var dataJson = {
        id: requestData
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
                sqlapi.deleteData('DELETE FROM mst_contact WHERE id=:id', dataJson)
                    .then(function (results) {
                        var reslog = {
                            status: 'success',
                            message: 'Deleted Successfully'
                        };
                        deferred.resolve(reslog);
                    }, function (err) {
                        var reslog = {
                            status: 'success',
                            message: ' Deleted Successfully'
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

models.get = (req) => {
    let query = req.query.id;
    var deferred = new Q.defer();
    query = typeof query !== "undefined" ? query : '';
    var dataJson = { id: query };
    var whereCondition = ' WHERE webid=:id ',
        whereConditionCount = ' WHERE  webid=:id ';

    sqlapi.selectData('SELECT * FROM  mst_contact ' + whereCondition, dataJson)
        .then(function (result) {
            deferred.resolve({
                status: 'success',
                message: 'List Successfully',
                data: result
            })
        }, function (err) {
            deferred.reject({
                status: 'error',
                message: msg
            })
        })
    return deferred.promise;
};

models.getId = (req) => {
    let query = req.query.id;
    var deferred = new Q.defer();
    try {

        query = typeof query !== "undefined" ? query : '';

        var dataJson = {
            id: query,
        };
        var whereCondition = ' WHERE id=:id ',
            whereConditionCount = ' WHERE  id=:id ';

        sqlapi.selectData('SELECT name AS sliderName,title AS sliderTitle,subtitle AS sliderSubtitle,img AS sliderImg FROM  mst_contact ' + whereCondition, dataJson)
            .then(function (results) {
                finalData = results;

                var reslog = {
                    status: 'success',
                    message: finalData.length > 0 ? 'listed Successfully' : 'Data not found No',
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
}

module.exports = models;