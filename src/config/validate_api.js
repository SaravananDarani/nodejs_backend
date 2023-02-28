/**
 * @file
 * 
 * Validate API Callback Details
 * 
 */
module.exports = function () {
    /* use global functions */
    // Modules includes
    var msgapi = require('./msg_api');
    var Q = require('q');

    var publicObject = {

        // Check for value must not be empty
        v_Emp: function (fld, value) {
            var deferred = new Q.defer();
            var Obj = {
                [fld]: [fld] + ' ' + msgapi.v_typ[0].Empty
            };
            try {
                value = value.toString();
            } catch (err) {
                deferred.reject(Obj);
            }
            if ((value == '') || (value == ' ') || (value == null) || (value == undefined) || (value.replace(/\s/g, "").length == 0)) {
                deferred.reject(Obj);
            } //false
            else {
                deferred.resolve();
            } //true
            return deferred.promise;
        },
        v_Eml: function (fld, value) {
            var deferred = new Q.defer();
            value1 = value.trim();
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].VEmail
            };
            // var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            var filter = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/;
            if (filter.test(value)) {
                deferred.resolve("No error");
            } //true
            else {
                deferred.reject(Obj);
            } //false
            return deferred.promise;
        },

    };
    return publicObject;
};