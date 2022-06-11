var nodemailer = require("nodemailer");
const https = require("https");
// var sendmail = require("./sendmail")({ silent: true });
const mailJet = require("./mailJet");


class Mail {
  // mailSender = async (req, res) => {
  //     const {email, name} = req.body
  //   sendMail(email, name).then(reply=>res.json({res:reply}))
  //     .catch(error=>res.status(500).json({error:error}))
  // };

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
  // sendMail = async (email, name) => {
  //   const transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: "leadersdashboard@gmail.com",
  //       pass: "dashboard012",
  //     },
  //   });
  //   const options =  {
  //       from: "leadersdashboard@gmail.com",
  //       to: "pm3199086@gmail.com",
  //       subject: " היי"+ name,
  //       ttext: "ברוכים הבאים לבית ספרנו",
  //   }
  //  return new Promise(function (resolve, reject) {
  //   transporter.sendMail(options, function(error, info){
  //     if (error) {
  //       console.log(error);
  //           reject(error);
  //     } else {
  //       console.log('Email sent: ' + info.response);
  //       resolve(info);
  //     }
  //   });
  //         }
      
  //   );
  // };
}

module.exports = new Mail();
