const jwt = require("jsonwebtoken");
const Student = require('../models/student');
const Teacher = require('../models/teacher');


class StudentsControllers {
    
    allStudent = async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
        const subject = req.query;
        // MongoClient.connect(url, async function (err, db) {
        //     if (err)
        //         return res.status(500).send(err);
        //     var dbo = db.db("mySchoolDB");
        try {


            //   let resultTeacher =await  dbo.collection("teacher").find({teacher:resultTeacher.subject}).toArray();
            let resultTeacher = await Student.find(subject);
            // db.close();
            return res.status(200).json(resultTeacher);
        } catch (error) {

            return res.status(500).json({ error: error })
        }
        // });
    }
   
}


module.exports = new StudentsControllers();