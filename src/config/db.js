const mysql = require("mysql");
const dbConfig = require("./db.config.js");

// var connection = mysql.createPool({
//     host: dbConfig.HOST,
//     user: dbConfig.USER,
//     password: dbConfig.PASSWORD,
//     database: dbConfig.DB
// });

// module.exports = connection;

module.exports = function () {
    var publicObject = {
        dbConnect: {
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DB,
            charset: 'utf8mb4'
        },
        encrypttionKey: {
            keyVal: "aspiresys"
        }
    }
    return publicObject
}