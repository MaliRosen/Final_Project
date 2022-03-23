const jwt = require("jsonwebtoken");
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const Test =require('../models/test')

class StudentsControllers {
    
    getAllBysubject = async (req, res) => {
        const subject = req.query;
        try {
            let resultTeacher = await Student.find(subject);
            return res.status(200).json(resultTeacher);
        } catch (error) {

            return res.status(500).json({ error: error })
        }
    }
    getAll = async (req, res) => {
        try {
            let resultStudent = await Student.find();
            return res.status(200).json({resultStudent:resultStudent});
        } catch (error) {
            return res.status(500).json({ error: error })
        }
    }
   
    getMarks= async (req, res) => {
        const studentId = req.params.studentId;
        Test.find().then(tests=>{
           const data= tests.map(test=>test.marks.find(m=>m.studentId==studentId)).filter(el=>!!el);
           res.json({data:data})
        })
        .catch(error=>{
            console.log('error on get marks', error);
            res.status(500).json({error:error})
        })
    }

    deleteById = (req, res) => {
        const { studentId } = req.params;
        Student.findByIdAndDelete(studentId)
          .then(() => {res.json({message:'ok'})})
          .catch(err=>res.status(500).json({err:err}))
      }
}


module.exports = new StudentsControllers();