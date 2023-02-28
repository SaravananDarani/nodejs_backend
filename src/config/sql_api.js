/**
 * @file
 * 
 * SQL API Callback Details
 * 
 */

/* use global functions */
// Modules includes
var data = require("../config/db.js");
var dbC = data().dbConnect;
var Q = require('q');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(dbC.database, dbC.user, dbC.password, {
    host: dbC.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    dialectOptions: {
        charset: dbC.charset,
        multipleStatements: true
    }
});

module.exports = function (DBConfig) {
    if (DBConfig) {
        sequelize.close();
        sequelize = new Sequelize(DBConfig.database, DBConfig.user, DBConfig.password, {
            host: DBConfig.host,
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            },
            dialectOptions: {
                charset: DBConfig.charset,
                multipleStatements: true
            }
        });
    }

    var publicObject = {
        // Insert data into the mysql database.
        insertData: function (sqlQry, dataJson) {
            var deferred = new Q.defer();
            sequelize.query(sqlQry, {
                raw: true,
                replacements: dataJson,
                type: sequelize.QueryTypes.CREATE
            })
                .then(function (result) {
                    deferred.resolve(result);
                }, function (err) {
                    deferred.reject(err);
                }).catch(function (err) {
                    var reslog = {
                        "status": "Error",
                        "message": err + ""
                    }
                    deferred.reject(reslog);
                });
            return deferred.promise;
        },
        // Update data from mysql database.
        updateData: function (sqlQry, dataJson) {
            var deferred = new Q.defer();
            sequelize.query(sqlQry, {
                raw: true,
                replacements: dataJson,
                type: sequelize.QueryTypes.UPDATE
            })
                .then(function (result) {
                    deferred.resolve(result);
                }, function (err) {
                    deferred.reject(err);
                }).catch(function (err) {
                    var reslog = {
                        "status": "Error",
                        "message": err + ""
                    }
                    deferred.reject(reslog);
                });
            return deferred.promise;
        },
        // Delete data from mysql database.
        deleteData: function (sqlQry, dataJson) {
            var deferred = new Q.defer();
            sequelize.query(sqlQry, {
                raw: true,
                replacements: dataJson,
                type: sequelize.QueryTypes.DELETE
            })
                .then(function (result) {
                    deferred.resolve(result);
                }, function (err) {
                    deferred.reject(err);
                }).catch(function (err) {
                    var reslog = {
                        "status": "Error",
                        "message": err + ""
                    }
                    deferred.reject(reslog);
                });
            return deferred.promise;
        },
        // Select data from mysql database.
        selectData: function (sqlQry, dataJson) {
            var deferred = new Q.defer();
            sequelize.query(sqlQry, {
                raw: true,
                replacements: dataJson,
                type: sequelize.QueryTypes.SELECT
            })
                .then(function (result) {
                    deferred.resolve(result);
                }, function (err) {
                    deferred.reject(err);
                }).catch(function (err) {
                    var reslog = {
                        "status": "Error",
                        "message": err + ""
                    }
                    deferred.reject(reslog);
                });
            return deferred.promise;
        },
        // Select store procedure data from mysql database.
        selectSPData: function (sqlQry, dataJson) {
            var deferred = new Q.defer(); //sp_getall
            sequelize.query(sqlQry, {
                raw: true,
                replacements: dataJson
            })
                .then(function (result) {
                    deferred.resolve(result);
                }, function (err) {
                    deferred.reject(err);
                }).catch(function (err) {
                    var reslog = {
                        "status": "Error",
                        "message": err + ""
                    }
                    deferred.reject(reslog);
                });
            return deferred.promise;
        }
    };
    return publicObject;
};