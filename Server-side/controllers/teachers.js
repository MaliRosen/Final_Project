const jwt = require("jsonwebtoken");
const Student = require("../models/student");
const Teacher = require("../models/teacher");

class TeacherControllers {
  previousLessons = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
    //  const { id } = req.query;
    // const subject = req.query;
    try {
      const { subject } = req.params;
      let result = await Lessons.find({ subject: subject });
      return res.status(200).json({result:result});
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  };

  allLessons = async (req, res) => {
    try {
      let resultTeacher = await Teacher.find().select("subject");
      return res.status(200).json(resultTeacher);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  };
  getallTeachers = async (req, res) => {
    try {
      let resultTeacher = await Teacher.find(); //.select('subject');
      return res.status(200).json({ resultTeacher: resultTeacher });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  };

  deleteById = (req, res) => {
    const { teacherId } = req.params;
    Teacher.findByIdAndDelete(teacherId)
      .then(() => {res.json({message:'ok'})})
      .catch(err=>res.status(500).json({err:err}))
  }
}

module.exports = new TeacherControllers();
