var nodemailer = require("nodemailer");
const https = require("https");
// var sendmail = require("./sendmail")({ silent: true });
const mailJet = require("./mailJet");


class Mail {

  send=(req, res)=>{
    const { email, name} = req.body;
    mailJet.sendMail(email, name)
    .then(reply=>res.json({reply:reply}))
    .catch(error=>res.status(500).json({error:error}))
  }

  sendMail = async (email, name) => {
     return new Promise((resolve, reject) => {
      mailJet.sendMail(email, name)
      .then(reply=>{resolve(reply);})
    .catch(error=>{reject(error);})
    });
  }
}

module.exports = new Mail();
