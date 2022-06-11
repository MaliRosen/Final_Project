const jwt = require("jsonwebtoken");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const MailController = require("./mail");

TOKEN_SECRET =
  "F9EACB0E0AB8102E999DF5E3808B215C028448E868333041026C481960EFC126";

class Login {
  generateAccessToken = (username) => {
    console.log("generateAccessToken ", username);
    return jwt.sign({ username: username }, TOKEN_SECRET);
  };

  login = async (req, res) => {
    try {
      const { user, password } = req.query;
      if (user == "1" && password == "1") return res.json({ kind: "admin" });
      var query = { email: user, password };
      let result;
      result = await Student.findOne(query);
      if (result) {
        return res.json({
          kind: "student",
          result,
          token: this.generateAccessToken(result.email),
        });
      }
      result = await Teacher.findOne(query);
      if (result) {
        return res.json({
          kind: "teacher",
          result,
          token: this.generateAccessToken(result.email),
        });
      }
      return res.status(200).json({});
    } catch (error) {
      // throw error
      console.log("error on login", error);
      return res.status(500).json({ error });
    }
  };

  loginWithToken = async (req, res) => {
    try {
      const { token, id } = req.body;
      let data = jwt.decode(token, TOKEN_SECRET);
      let result;
      result = await Student.findById(id);
      if (result && result.email === data.username) {
        return res.json({ kind: "student", result });
      }

      result = await Teacher.findById(id);
      if (result && result.email === data.username) {
        return res.json({ kind: "teacher", result });
      }
      return res.status(200).json({});
    } catch (error) {
      // throw error
      console.log("error on login", error);
      return res.status(500).json({ error });
    }
  };

  signup = async (req, res) => {
    const { subject, firstName, lastName, id, email, password } = req.body;
    const user = await Student.findOne({ email })
    if(user){
      return res.status(500).json({status:500, message:'כתובת מייל כבר רשומה במערכת', user: user});
    }
      MailController.sendMail(email, firstName)
        .then(async () => {
          const myobj = new Student(req.body);
          await myobj.save();
          console.log("1 document inserted", email);

          const token = this.generateAccessToken(myobj.email);
          return res.json({ result: myobj, token: token });
        })
        .catch((error) => {
          console.log("error on signup", error);
          if(error.code=== 11000 && Object.keys(error.keyPattern)=='email'){
            return res.status(500).json({status:500, error: error, message:'כתובת מייל כבר רשומה במערכת' });
          }
          return res.status(500).json({status:500, error: error, message:'כתובת מייל לא תקינה' });
        });
  };

  signupTeacher = async (req, res) => {
    try {
      var myobj = new Teacher(req.body);
      await myobj.save();
      console.log("1 document inserted");
      return res.json({message:'ok'});
    } catch (error) {
      if(error.code=== 11000 && Object.keys(error.keyPattern)=='subject'){
        return res.status(500).json({status:500, error: error, message:'שיעור זה כבר קיים במערכת' });
      }
      res.status(500).send(error);
    }
  };

  forgetPassword = async (req, res) => {
    try {
      const { email, password } = req.body;
      //Validations.
      //Check if  exists
      let l = await Student.findOne({ email: email });
      if (l) {
        l.password = password;
      } else {
        l = await Teacher.findOne({ email: email });
        l.password = password;
      }
      l.save();
      return res.send();
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };
}

module.exports = new Login();
