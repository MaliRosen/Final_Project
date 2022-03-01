const jwt = require("jsonwebtoken");
const Student = require("../models/student");
const Lessons = require("../models/lessons");
const { ObjectId } = require('mongodb');

class LessonsControllers {
  previousLessons = async (req, res) => {
    //  const { id } = req.query;
    // const subject = req.query;
    try {
      const { subject } = req.params;
      console.log("on", subject);
      let result = await Lessons.find({ subject: subject });
      return res.status(200).json({ result: result });
    } catch (error) {
      console.log("error on previousLessons", error);
      return res.status(500).json({ error: error });
    }
  };

  allHw = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
    const { subject } = req.query;
    try {
      // let resultHw = await Lessons.find({subject:subject})
      // let resultHw = await Lessons.find({subject:subject},select:{field:1})
      let resultHw = await Lessons.find({ subject: subject }).populate({
        path: "arrHw.studentId",
      });
      return res.status(200).json(resultHw);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  };

  allLessons = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
    const subject = req.query;
    try {
      let result = await Lessons.find(subject);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  };

  allAttendance = (req, res) => {
     Lessons.find()
        .then(resultAttendance=>{ return res.status(200).json(resultAttendance); })
        .catch ((error)=> { return res.status(500).json({ error: error }); })
  };

  postLesson = async (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    const { teacher, numLesson, lessonName, file, date, notes, time, subject } =
      req.body; //Adress, phone ....
    //Validations.
    //Check if user exists
    var arrHw = [];
    var myobj = new Lessons({
      teacher,
      numLesson,
      lessonName,
      file,
      date,
      notes,
      time,
      subject,
      arrHw,
    });
    await myobj.save();
    console.log("1 document inserted");

    // const token = generateAccessToken(user);
    return res.send("OK");
  };


  postHwAnswer=async(req,res)=>{
    try{
    const {lessonId, studentId, file, } = req.body
    const student =await Student.findById(studentId);
    Lessons.findByIdAndUpdate(lessonId,
       {$push:{"arrHw":{studentId:student,file:file}}},
       {upsert: true, new : false}
       )
      .then(response=> res.json({message:'OK',res:response}))
      .catch(err=>res.status(500).json({err:err}))
    } catch(error){
      res.status(500).json({err:err});
    }
  }

  postHw = async (req, res) => {
    try {
      const {
        numLesson,
        nameSubject,
        date,
        file,
        comments,
        question1,
        question2,
        subject,
      } = req.body;
      var myobj = { nameSubject, date, file, comments, question1, question2 };

      let les = await Lessons.findOne({
        numLesson: numLesson,
        subject: subject,
      });
      console.log("***", numLesson);
      les.hwQuestions.push(myobj);
      les.save();
      return res.send();
      //     }
      // });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };
  postMark = async (req, res) => {
    try {
      const {
        studentId,
        mark,
        lessonId,
      } = req.body;

      let les = await Lessons.findById(lessonId);
      // les.arrHw.push(
      //   {
      //       studentId: studentId,
      //       mark: mark,
      //   })
      les.arrHw.find(el=>el.studentId._id==studentId).mark=mark
      les.save();
      return res.send();
      //     }
      // });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };

  attendance = async (req, res) => {
    let lessons
    try {
      const {  date, userId, subject } = req.body; 

      lessons = await Lessons.find({subject:subject});
      const lesson = lessons.find(lesson=>new Date(date).toLocaleDateString()===new Date().toLocaleDateString(lesson.date))
      if(!lesson){
        return res.json({message:'no lesson now'});
      }
      if(!lesson.arrAttendance) lesson.arrAttendance=[];
      if(!lesson.arrAttendance.find(el=>el.studentId.toString() === userId)){
        lesson.arrAttendance.push({studentId:userId ,date, isLate: false});
        lesson.save();
      } else {
        return res.json({message:'user already attendance'});
      }
      return res.send();
    } catch (error) {
      console.log('error on post attendance: ',error);
      res.status(500).json({error:error, lessons:lessons});
    }
  };

  updateLessonForStudent= async (req, res) => {
    try{
    const {userId}=req.params;
    const {subject}=req.body
    console.log('on subs', userId,subject);
    await Student.findByIdAndUpdate(userId,{subject})
    return res.json({message:'OK'});
    } catch (error) {
      res.status(500).json({error:error})
    }

  }
}

module.exports = new LessonsControllers();
