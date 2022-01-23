const jwt = require("jsonwebtoken");
const Student = require('../models/student');
const Teacher = require('../models/teacher');


class TeacherControllers {

    previousLessons = async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
        //  const { id } = req.query;
        // const subject = req.query;
        try {
          const { subject } = req.params
          let result = await Lessons.find({ subject: subject });
          return res.status(200).json(result);
        } catch (error) {
          return res.status(500).json({ error: error })
        }
      }

      
  allTeachers = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    // MongoClient.connect(url, async function (err, db) {
    //     if (err)
    //         return res.status(500).send(err);
    //     var dbo = db.db("mySchoolDB");
    try {


      //   let resultTeacher =await  dbo.collection("teacher").find({teacher:resultTeacher.subject}).toArray();
      let resultTeacher = await Teacher.find().select('subject');
      //   db.close();
      // return res.status(200).json(resultTeacher.map(teacher => teacher.subject));
       return res.status(200).json(resultTeacher);
    } catch (error) {
      return res.status(500).json({ error: error })
    }
    // });
  }
  
}


module.exports = new TeacherControllers();