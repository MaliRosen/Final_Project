const jwt = require("jsonwebtoken");
const Student = require('../models/student');
const Teacher = require('../models/teacher');


class LessonsControllers {
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

      allHw = async(req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
        const {subject} = req.query
            try {
                
                // let resultHw = await Lessons.find({subject:subject})
                // let resultHw = await Lessons.find({subject:subject},select:{field:1})
                 let resultHw = await Lessons.find({subject:subject}).populate({path:"arrHw.studentId"})
                return res.status(200).json(resultHw);
            } catch (error) {
                return res.status(500).json({ error: error })
            }
    }

    allLessons = async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
        const subject = req.query;
        try {
            let result = await Lessons.find(subject);
            return res.status(200).json(result);
        } catch (error) {

            return res.status(500).json({ error: error })
        }
    }

    allAttendance = (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
        MongoClient.connect(url, async function (err, db) {
            if (err)
                return res.status(500).send(err);
            var dbo = db.db("mySchoolDB");
            try {


                //   let resultTeacher =await  dbo.collection("teacher").find({teacher:resultTeacher.subject}).toArray();
                // let resultAttendance = await dbo.collection("lessons").find().toArray();
                db.close();
                return res.status(200).json(resultAttendance);
            } catch (error) {

                return res.status(500).json({ error: error })
            }
        });
    }

    postLesson = async (req, res) => {
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
        const { teacher, numLesson, lessonName, file, date, notes, time, subject } = req.body; //Adress, phone ....
        //Validations.
        //Check if user exists
        var arrHw = [];
        var myobj = new Lessons({ teacher, numLesson, lessonName, file, date, notes, time, subject, arrHw });
        await myobj.save();
        console.log("1 document inserted");
    
        // const token = generateAccessToken(user);
        return res.send();
    
    
      }

      postHw = async (req, res) => {
        try {
            const { numLesson, nameSubject, date, file, comments, question1, question2, subject } = req.body;
            var myobj = { nameSubject, date, file, comments, question1, question2 };
            //  Lessons.updateOne({ numLesson: id }, { $addFields: { hwQuestions: myobj } }, function (err, res) {
            // Lessons.updateOne({ _id: ObjectId(id) }, { $addFields: { hwQuestions: myobj } }, function (err, res) {
            //Lessons.findByIdAndUpdate( ObjectId(id) ,  { hwQuestions: myobj  }, function (err, res) {
            // Lessons.findByOneAndUpdate( { numLesson: numLesson } ,  { hwQuestions: myobj  }, function (err, res) 
            // console.log(numLesson);
            // console.log(Lessons);

            // Lessons.findByOneAndUpdate({ numLesson: numLesson }, {
            //     $push: { hwQuestions: myobj }, function(err, res) {
            //         if (err) throw err;
            //         console.log("1 document inserted");

            //         // const token = generateAccessToken(user);
            //         // console.log("token", token);
            let les = await Lessons.findOne({ numLesson: numLesson, subject: subject });
            console.log("***", numLesson);
            les.hwQuestions.push(myobj);
            les.save()
            return res.send();
            //     }
            // });
        } catch (error) {
            console.log(error);
            res.status(500).send(error)
        }
    }

    attendance = async (req, res) => {
        try {
          const { d, userId, subject } = req.body; //Adress, phone ....
          //Validations.
          //Check if user exists
    
          var myobj = { d, userId };
          // let result =  await dbo.collection("teacher").findOne() //חיפוש לי תז מורה
          // dbo.collection("teacher").update({subject:subject}, {$set:{arrAttendance}}, {
    
          //   arrAttendance: [myobj, ... ]      
          // })
    
          let result = await Lessons.findOneAndUpdate({ "subject": subject, date: { $lte: new Date() } },);
          // result.findOneAndUpdate("attendance")
          // let result =  await dbo.collection("teacher").findOneAndUpdate({subject:subject},{arrAttendance: $push(myobj) }
          //   , function (err, res) {
          //     if (err) throw err;
          //     console.log("1 document inserted attendance");
          //     console.log(result);
          //     db.close();
          //   });
          // const token = generateAccessToken(user);
          // console.log("token", token);
          return res.send();
        } catch (error) {
          res.status(500).send(error)
        }
      }
  
}


module.exports = new LessonsControllers();