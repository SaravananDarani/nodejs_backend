const sql = require("../config/db.js");
var sql_api = require('../config/sql_api');
var sqlapi = new sql_api();
const utility = require('../config/utility');
const ValidateApi = require('../config/validate_api');
const valapi = new ValidateApi();
const Q = require('q');

// constructor
const user = (user) => { };

user.add = (req) => {
    var deferred = new Q.defer();
    let requestData = req.body;
    requestData.menuName = typeof requestData.menuName !== "undefined" ? requestData.menuName : '';
    requestData.menuPath = typeof requestData.menuPath !== "undefined" ? requestData.menuPath : '';
    requestData.menuIcon = typeof requestData.menuIcon !== "undefined" ? requestData.menuIcon : '';
    requestData.parentId = typeof requestData.parentId !== "undefined" ? requestData.parentId : '';
    requestData.webid = typeof requestData.webid !== "undefined" ? requestData.webid : '';

    var dataJson = {
        menuName: requestData.menuName,
        menuPath: requestData.menuPath,
        menuIcon: requestData.menuIcon,
        parentId: requestData.parentId,
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
                sqlapi.insertData('INSERT INTO mst_menu (menu_name,menu_link,icon,parent_menu_id,status,webid) VALUES (:menuName,:menuPath,:menuIcon,:parentId,1,:webid)', dataJson)
                    .then(function (results) {
                        if (results.length > 0) {
                            var reslog = {
                                status: 'success',
                                message: 'Menu Inserted successfully'
                            };
                            deferred.resolve(reslog);
                        } else {
                            var reslog = {
                                status: 'false',
                                message: 'menu not inserted'
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
user.update = (req) => {
    var deferred = new Q.defer();
    let requestData = req.body;
    requestData.menuName = typeof requestData.menuName !== "undefined" ? requestData.menuName : '';
    requestData.menuPath = typeof requestData.menuPath !== "undefined" ? requestData.menuPath : '';
    requestData.menuIcon = typeof requestData.menuIcon !== "undefined" ? requestData.menuIcon : '';
    requestData.parentId = typeof requestData.parentId !== "undefined" ? requestData.parentId : '';
    requestData.webid = typeof requestData.webid !== "undefined" ? requestData.webid : '';
    requestData.id = typeof requestData.id !== "undefined" ? requestData.id : '';

    var dataJson = {
        menuName: requestData.menuName,
        menuPath: requestData.menuPath,
        menuIcon: requestData.menuIcon,
        parentId: requestData.parentId,
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
                sqlapi.updateData('UPDATE mst_menu SET menu_name =:menuName, status = 1,menu_link =:menuPath,icon =:menuIcon WHERE id = :dataId', dataJson)
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
                var reslog = {
                    status: 'false',
                    message: msg
                };
                deferred.reject(reslog);
            }
        });
    return deferred.promise;
}

user.delete = (req) => {
    var deferred = new Q.defer();
    let requestData = req.body;
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
                sqlapi.deleteData('DELETE FROM mst_menu WHERE id=:id', dataJson)
                    .then(function (results) {
                        var reslog = {
                            status: 'success',
                            message: 'Lead Deleted Successfully'
                        };
                        deferred.resolve(reslog);
                    }, function (err) {
                        var reslog = {
                            status: 'success',
                            message: 'Lead Deleted Successfully'
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

user.get = (req) => {
    let query = req.query.id;
    var deferred = new Q.defer();
    query = typeof query !== "undefined" ? query : '';
    var dataJson = { id: query };
    var whereCondition = ' WHERE webid=:id ',
        whereConditionCount = ' WHERE  webid=:id ';

    sqlapi.selectData('SELECT  id AS menuId,icon AS icon,menu_name AS menuName,parent_menu_id AS parentMenuId,menu_link as menuLink ,createdDate FROM  mst_menu ' + whereCondition, dataJson).then(function (result) {
        var menuList = [];
        result.map((elem, index, self) => {
            if (elem.parentMenuId == 0) {
                menuList.push({
                    name: elem.menuName,
                    route: elem.menuLink,
                    id: elem.menuId,
                    parentId: elem.parentMenuId,
                    icon: elem.icon,
                    createdDate: elem.createdDate,
                    submenu: []
                });
            } else {
                for (let i = 0; i < menuList.length; i++) {
                    if (menuList[i]['id'] == elem.parentMenuId) {
                        menuList[i]['submenu'].push({
                            name: elem.menuName,
                            route: elem.menuLink,
                            id: elem.menuId,
                            parentId: elem.parentMenuId,
                            icon: elem.icon,
                            createdDate: elem.createdDate,
                            submenu: []
                        })
                    } else {
                        for (let j = 0; j < menuList[i].submenu.length; j++) {
                            if (menuList[i].submenu[j]['id'] == elem.parentMenuId) {
                                menuList[i]['submenu'][j]['submenu'].push({
                                    name: elem.menuName,
                                    route: elem.menuLink,
                                    id: elem.menuId,
                                    parentId: elem.parentMenuId,
                                    icon: elem.icon,
                                    createdDate: elem.createdDate,
                                    submenu: []
                                })
                            } else {
                                for (let k = 0; k < menuList[i].submenu[j].submenu.length; k++) {
                                    if (menuList[i].submenu[j].submenu[k]['id'] == elem.parentMenuId) {
                                        menuList[i]['submenu'][j]['submenu'][k]['submenu'].push({
                                            name: elem.menuName,
                                            route: elem.menuLink,
                                            id: elem.menuId,
                                            parentId: elem.parentMenuId,
                                            icon: elem.icon,
                                            createdDate: elem.createdDate,
                                            submenu: []
                                        })
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
        deferred.resolve({
            status: 'success',
            message: 'List Successfully',
            data: menuList
        })
    }, function (err) {
        deferred.reject({
            status: 'error',
            message: msg
        })
    })
    return deferred.promise;
};

user.getId = (req) => {
    let query = req.query.id;
    var deferred = new Q.defer();
    try {

        query = typeof query !== "undefined" ? query : '';

        var dataJson = {
            id: query,
        };
        var whereCondition = ' WHERE id=:id ',
            whereConditionCount = ' WHERE  id=:id ';

        sqlapi.selectData('SELECT  id AS menuId,icon AS icon,menu_name AS menuName,parent_menu_id AS parentMenuId,menu_link as menuLink ,createdDate FROM  mst_menu ' + whereCondition, dataJson)
            .then(function (results) {
                finalData = results;

                var reslog = {
                    status: 'success',
                    message: finalData.length > 0 ? ' Lead listed Successfully' : 'Data not found No',
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


module.exports = user;