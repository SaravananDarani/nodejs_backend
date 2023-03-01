
const mailer = require("nodemailer");
const nodemailer = require('nodemailer');
const { Hello } = require("./hello_template");
const { Thanks } = require("./thanks_template");

var sql_api = require('../sql_api');
var Q = require('q');

const getEmailData = (to, name, template, db) => {
    let data = null;

    switch (template) {
        case "hello":
            data = {
                from: "noreply next app <noreplyvel@gmail.com>",
                to,
                subject: `Hello ${name}`,
                html: db
            }
            break;

        case "thanks":
            data = {
                from: "noreply next app <noreplyvel@gmail.com>",
                to,
                subject: `Hello ${name}`,
                html: db
            }
            break;
        default:
            data;
    }
    return data;
}

//iglndscklvgmnakd
//iglndscklvgmnakd
//iglndscklvgmnakd
const sendEmail = (to, name, type, db) => {

    var deferred = new Q.defer();
    var promises = [

    ];

    Q.allSettled(promises)
        .then(result => {

            const smtpTransport = mailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "noreplyvel@gmail.com",
                    pass: "iglndscklvgmnakd"
                }
            })

            const mail = getEmailData(to, name, type, db)

            smtpTransport.sendMail(mail, function (error, response) {
                if (error) {
                    console.log(error)
                    var reslog = {
                        error: 'true',
                        message: error
                    };
                    deferred.reject(reslog);

                } else {
                    console.log(" email sent successfully")
                    var reslog = {
                        error: 'false',
                        message: 'Mail Sent Successfully'
                    };
                    deferred.reject(reslog);
                }

                smtpTransport.close();

            })
        })
    return deferred.promise;

}

module.exports = { sendEmail }