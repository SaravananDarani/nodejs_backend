var sql_api = require('../config/sql_api');
var sqlapi = new sql_api();
const utility = require('../config/utility');
const ValidateApi = require('../config/validate_api');
const valapi = new ValidateApi();
const Q = require('q');

// constructor
const user = (user) => { };

user.upload = (req) => {
    const file = req.file;
    var deferred = new Q.defer();
    try {
        if (!file) {
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400;
            var reslog = {
                status: 'failds',
                message: 'failed uploaded',
                data: file
            };
            deferred.resolve(reslog);
        } else {
            var reslog = {
                status: 'success',
                message: 'successfully uploaded',
                data: file

            };
            deferred.resolve(reslog);
        }
    } catch (err) {
        var reslog = {
            status: 'error',
            message: err
        };
        deferred.reject(reslog);
    }
    return deferred.promise;

}

user.hostFind = (req) => {
    let query = req.query.id;
    var deferred = new Q.defer();
    try {
        query = typeof query !== "undefined" ? query : '';
        var dataJson = { id: query };

        sqlapi.selectData('SELECT host FROM `mst_company` WHERE id=:id ', dataJson)
            .then(function (results) {
                var finalData = results;
                var reslog = {
                    status: 'success',
                    message: finalData.length > 0 ? 'Listed Successfully' : 'Data not found',
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

user.hostFindId = (req) => {
    let query = req.query.id;
    var deferred = new Q.defer();
    try {
        query = typeof query !== "undefined" ? query : '';
        var dataJson = { id: query };

        sqlapi.selectData('SELECT * FROM `mst_company` WHERE host=:id ', dataJson)
            .then(function (results) {
                var finalData = results;
                var reslog = {
                    status: 'success',
                    message: finalData.length > 0 ? 'Listed Successfully' : 'Data not found',
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

user.hostUpdate = (req) => {
    var deferred = new Q.defer();
    let requestData = req.body;

    requestData.id = typeof requestData.id !== "undefined" ? requestData.id : '';
    requestData.name = typeof requestData.name !== "undefined" ? requestData.name : '';

    var dataJson = {
        id: requestData.id,
        name: requestData.name,
    };

    var promises = [
        valapi.v_Emp("host", dataJson.name),
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
                sqlapi.updateData('UPDATE `mst_company` SET `host` =:name WHERE id = :id', dataJson)
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

// Title
user.titleFind = (req) => {
    let query = req.query.id;
    var deferred = new Q.defer();
    try {
        query = typeof query !== "undefined" ? query : '';
        var dataJson = { id: query };

        sqlapi.selectData('SELECT title FROM `mst_company` WHERE id=:id ', dataJson)
            .then(function (results) {
                var finalData = results;
                var reslog = {
                    status: 'success',
                    message: finalData.length > 0 ? 'Listed Successfully' : 'Data not found',
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

user.titleFindId = (req) => {
    let query = req.query.id;
    var deferred = new Q.defer();
    try {
        query = typeof query !== "undefined" ? query : '';
        var dataJson = { id: query };

        sqlapi.selectData('SELECT * FROM `mst_company` WHERE title=:id ', dataJson)
            .then(function (results) {
                var finalData = results;
                var reslog = {
                    status: 'success',
                    message: finalData.length > 0 ? 'Listed Successfully' : 'Data not found',
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

user.titleUpdate = (req) => {
    var deferred = new Q.defer();
    let requestData = req.body;

    requestData.id = typeof requestData.id !== "undefined" ? requestData.id : '';
    requestData.name = typeof requestData.name !== "undefined" ? requestData.name : '';

    var dataJson = {
        id: requestData.id,
        name: requestData.name,
    };

    var promises = [
        valapi.v_Emp("title", dataJson.name),
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
                sqlapi.updateData('UPDATE `mst_company` SET `title` =:name WHERE id = :id', dataJson)
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


// logo
user.logoFind = (req) => {
    let query = req.query.id;
    var deferred = new Q.defer();
    try {
        query = typeof query !== "undefined" ? query : '';
        var dataJson = { id: query };

        sqlapi.selectData('SELECT logo FROM `mst_company` WHERE id=:id ', dataJson)
            .then(function (results) {
                var finalData = results;
                var reslog = {
                    status: 'success',
                    message: finalData.length > 0 ? 'Listed Successfully' : 'Data not found',
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

user.logoFindId = (req) => {
    let query = req.query.id;
    var deferred = new Q.defer();
    try {
        query = typeof query !== "undefined" ? query : '';
        var dataJson = { id: query };

        sqlapi.selectData('SELECT * FROM `mst_company` WHERE id=:id ', dataJson)
            .then(function (results) {
                var finalData = results;
                var reslog = {
                    status: 'success',
                    message: finalData.length > 0 ? 'Listed Successfully' : 'Data not found',
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

user.logoUpdate = (req) => {
    var deferred = new Q.defer();
    let requestData = req.body;

    requestData.id = typeof requestData.id !== "undefined" ? requestData.id : '';
    requestData.name = typeof requestData.name !== "undefined" ? requestData.name : '';

    var dataJson = {
        id: requestData.id,
        name: requestData.name,
    };

    var promises = [
        valapi.v_Emp("title", dataJson.name),
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
                sqlapi.updateData('UPDATE `mst_company` SET `logo` =:name WHERE id = :id', dataJson)
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




module.exports = user;