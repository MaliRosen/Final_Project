const mailjet = require ('node-mailjet')
.connect('8fac4176ee672f96130a0f44c06fd19b', 'd3f1ea9e0088113f1a15fe70d7486c96')
const request =(email, name)=> mailjet.post("send", {'version': 'v3.1'}).request({
  "Messages":[
    {
      "From": {
        "Email": "myschool150922@gmail.com",
        "Name": "my-school"
      },
      "To": [
        {
          "Email": email,
          "Name": name
        }
      ],
      "Subject": "Greetings from MY SCHOOL.",
      "TextPart": " היי"+ name ,
      "HTMLPart": "<h3>ברוכים הבאים לבית ספרנו <a href='http://localhost:3000/'>MY SCHOOL</a>!</h3><br />",
      "CustomID": "AppGettingStartedTest"
    }
  ]
})
const sendMail=(email, name)=>{
    return new Promise((resolve, reject)=>{
      console.log('sending email...');
        request(email, name)
  .then((result) => {
    console.log('sending email to ',name,': ',email,' succeed');
    resolve(result.body)
  })
  .catch((err) => {
    console.log('sending email to ',name,': ',email,' failed');
    reject(err.statusCode)
  })
    })
}

module.exports.sendMail = sendMail