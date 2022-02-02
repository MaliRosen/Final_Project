const jwt = require("jsonwebtoken");
const Student = require('../models/student');
const Teacher = require('../models/teacher');

  TOKEN_SECRET = "F9EACB0E0AB8102E999DF5E3808B215C028448E868333041026C481960EFC126";

class Login {

  generateAccessToken = (username) => {
    console.log('generateAccessToken ', username);
    return jwt.sign({ username: username }, TOKEN_SECRET);
  };

  login = async (req, res) => {
    try {
      const { user, password } = req.query;
      if (user == '1' && password == '1')
        return res.json({ kind: 'admin' });
      var query = { email: user, password };
      let result
      result = await Student.findOne(query)
      if (result) {
         return res.json({ kind: 'student', result , token:this.generateAccessToken(result.email) });
      }
      result = await Teacher.findOne(query)
      if (result) {
         return res.json({ kind: 'teacher', result, token:this.generateAccessToken(result.email) });
      }
      return res.status(200).json({});
    } catch (error) {
      // throw error
      console.log('error on login', error);
      return res.status(500).json({ error })
    }
  }

  loginWithToken = async(req,res) =>{
    try{
    const { token, id } = req.body;
    let data= jwt.decode(token, TOKEN_SECRET)
    let result
    result = await Student.findById(id)
    if (result && result.email===data.username) {
       return res.json({ kind: 'student', result});
    }

    result = await Teacher.findById(id)
    if (result && result.email===data.username) {
       return res.json({ kind: 'teacher', result});
    }
    return res.status(200).json({});
  } catch (error) {
    // throw error
    console.log('error on login', error);
    return res.status(500).json({ error })
  }
    
  }

  signup = async (req, res) => {
    try {
      const { subject, firstName, lastName, id, email, password } = req.body;
      //Validations.
      //Check if user exists

      var myobj = new Student({ subject, firstName, lastName, id, email, password });
      await myobj.save();
      console.log("1 document inserted");

      const token = this.generateAccessToken(myobj.email);
      // console.log("token", token);
      return res.json({result:myobj, token:token});

    } catch (error) {
      console.log('error on signup',error);
      res.status(500).json({error})
    }
  }

  signupTeacher = async (req, res) => {
    try {
      const { subject, firstName, lastName, id, email, password, arrMarks, arrAttendance } = req.body; //Adress, phone ....
      //Validations.

      var myobj =new Teacher({ subject, firstName, lastName, id, email, password, arrMarks, arrAttendance });
     await myobj.save()
        console.log("1 document inserted");

        // const token = generateAccessToken(user);
        // console.log("token", token);
        return res.send();
    } catch (error) {
      res.status(500).send(error)
    }
  }

  forgetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        //Validations.
        //Check if  exists
        let l = await Student.findOne({ email: email });
        if (l) {
            l.password = password;
        }
        else {
            l = await Teacher.findOne({ email: email });
            l.password = password;
        }
        l.save();
        return res.send();
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

}


module.exports = new Login();