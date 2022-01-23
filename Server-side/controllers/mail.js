var nodemailer = require('nodemailer');
class Mail {
    mailSender = async (req, res) => {
        console.log("--------------------");

        console.log(req.body.email);

        const { contact } = req.body
        //אתחול המשתנים של שליחת המייל
        var transporter = nodemailer.createTransport({
         
            service: 'gmail',
            auth: {
                user: 'myschool863@gmail.com‏',
                pass: 'tkhacgnkh',
            }
        });


        // var transporter = nodemailer.createTransport(({
        //     host: "myschool863@gmail.com‏", // hostname
        //     secure: false, // use SSL
        //     port: 25, // port for secure SMTP
        //     auth: {
        //         user: 'myschool863@gmail.com‏',
        //         pass: 'tkhacgnkh',
        //     },
        //     tls: {
        //         rejectUnauthorized: false
        //     }
        // }));
        var mailOptions = {
            // from: 'leadersdashboard@gmail.com',
            // to: contact.email,
            to: req.body.email,
            subject: 'Sending Email using Node.js',
            html: 'ברוכים הבאים לבית ספרנו',

            text: 'That was easy!'
            ,
            // text:contact
        };
        //הפעלת הפונקציה
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error('error on mailSender ', error);
            } else {
                console.info('Email sent: ' + info.response);
            }
        })
    }

}

module.exports = new Mail();