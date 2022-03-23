const jwt = require("jsonwebtoken");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
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

  allAttendance = async (req, res) => {
    try{
    const { subject }=req.params
    const students=await Student.find({subject}, '_id firstName lastName')
    const lessons= await Lessons.find({subject}, '_id lessonName date arrAttendance subject')

    return res.status(200).json({students:students, lessons:lessons});
  }catch (error) {
    console.log('error on get allAttendance',error); return res.status(500).json({ error: error }); }
  };

  postLesson = async (req, res) => {
  try{
    const { teacher, lessonName, file, date, notes, time, subject, video } =  req.body; 
    
    const numLesson =(await Lessons.find({subject:subject})?.length || 0)+1
    console.log('numLesson ',numLesson);
    var myobj = new Lessons({
      teacher,
      lessonName,
      file,
      numLesson,
      date,
      notes,
      time,
      subject,
      video
    });
    await myobj.save();
    console.log("1 document inserted");

    // const token = generateAccessToken(user);
    return res.send("OK");
  } catch (error) {
    console.log('error on post lesson:', error);
    res.status(400).json({error: error});
  }
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
      const { userId } = req.params
      const {  date, subject } = req.body; 

      lessons = await Lessons.find({subject:subject});
      console.log('date:', new Date(date).toLocaleDateString())
      console.log('dates:', lessons.map(lesson=>new Date(lesson.date).toLocaleDateString()));
      const lesson = lessons.find(lesson=>new Date(date).toLocaleDateString()===new Date(lesson.date).toLocaleDateString())
      if(!lesson){
        return res.json({message:'no lesson now'});
      }

      if(!lesson.arrAttendance) lesson.arrAttendance=[];
      if(!lesson.arrAttendance.find(el=>el.studentId.toString() === userId)){
        lesson.arrAttendance.push({studentId:userId ,date, isLate: false});
        lesson.save();
      } else {
        return res.json({message:'user already attendance',lesson:lesson});
      }
      return res.json({message:'attendanced successfully', lesson:lesson});
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
    return res.json({message:'OK', subject:subject});
    } catch (error) {
      res.status(500).json({error:error})
    }

  }

  deleteLesson = async (req, res) => {
    try{
      const { lessonId } = req.params;
      const lesson = await Lessons.findByIdAndDelete(lessonId);
      console.log('lesson' , lesson.subject);
      res.send('ok');
    }catch (err) {
      console.log('error on delete lesson');
      return res.status(400).json({error:err});
    }
  }
  getLesson = async (req, res) => {
    try{
      const { lessonId } = req.params;
      const lesson = await Lessons.findById(lessonId);
      res.json({lesson:lesson}); 
    } catch (err) {
      console.log('error on delete lesson');
      return res.status(400).json({error:err});
    }
  }
}

module.exports = new LessonsControllers();
