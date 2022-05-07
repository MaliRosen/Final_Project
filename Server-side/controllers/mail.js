var nodemailer = require("nodemailer");
const https = require("https");
var sendmail = require("./sendmail")({ silent: true });

class Mail {
  mailSender = async (req, res) => {
      const {email, name} = req.body
    sendMail(email, name).then(reply=>res.json({res:reply}))
      .catch(error=>res.status(500).json({error:error}))
  };


  sendMail = async (email, name) => {
    const options =  {
        from: "pm3199086@gmail.com",
        to: email,
        subject: " היי"+ name,
        html: "ברוכים הבאים לבית ספרנו",
    }
   return new Promise(function (resolve, reject) {
      sendmail(options, (err, reply) => {
        console.log('err: ',err, 'reply: ',reply);
          if(err){
            reject(err);
          }
        resolve(reply);
      }
    );
   }) 
  };
}

module.exports = new Mail();
