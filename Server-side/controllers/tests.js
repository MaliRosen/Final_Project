// var MongoClient = require('mongodb').MongoClient;
const jwt = require("jsonwebtoken");
// var url = "mongodb://localhost:27017/mySchoolDB";
const Test = require('../models/test');
const { ObjectId } = require('mongodb');

class TestController {


    allTests = async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
        const subject = req.query;
        // MongoClient.connect(url, async function (err, db) {
        //     if (err)
        //         return res.status(500).send(err);
        //     var dbo = db.db("mySchoolDB");
        try {
            let resultTest = await Test.find(subject).populate({path:"marks.studentId"});
            // db.close();
            return res.status(200).json(resultTest);
        } catch (error) {

            return res.status(500).json({ error: error })
        }
        // });
    }
    myTests = async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
        const subject = req.query.subject;
        const id = req.query.id;

        // MongoClient.connect(url, async function (err, db) {
        //     if (err)
        //         return res.status(500).send(err);
        //     var dbo = db.db("mySchoolDB");
        try {
            let resultTest = await Test.find({ subject:subject, "marks.studentId":ObjectId(id)})
            // .populate({
            //     path: 'marks',
            //     match: { studentId: { $e: id } },
            //     // select: 'name -_id'
            //   })
            // . populate(marks);
            // db.close();
            return res.status(200).json(resultTest);
        } catch (error) {

            return res.status(500).json({ error: error })
        }
        // });
    }

    getTests = async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
        try {
            let theTests = Test.find();
            return res.status(200).json(theTests);
        } catch (error) {
            return res.status(500).json({ error: error })
        }
    }

    postFile = async (req, res) => {
        try {
    
          
          const { type, lessonId, studentId, file } = req.body;
    
          let field = type === "Lessons" ? 'arrHw' : 'marks'
          const collection =type === "Lessons" ? Lessons : Tests
    
          const obj = { studentId, file }
          console.log(lessonId);
          let l = await collection.findById(lessonId)
          console.log("l.arrHw", l.arrHw);
          l[field].push(obj);
          l.save();
          return res.send();
        } catch (error) {
          console.log(error);
          res.status(500).send(error)
        }
      }
    
      postMark = async (req, res) => {
        try {
          
          const { type, marks, lessonId } = req.body;
          //Validations.
          //Check if  exists
          // Lessons.findByOneAndUpdate({_id:ObjectId(lessonId),"arrHw.studentId":ObjectId(studentId) }, {
          let field = type === "Lessons" ? 'arrHw' : 'marks'
          const collection =type === "Lessons" ? Lessons : Tests
      
          let l = await collection.findById(lessonId)
          // console.log("********", l);
          let hw = l[field].find(x => x.studentId == marks.id);
          console.log("marks", marks);
          hw.mark = marks.mark;
          // console.log("hw", hw);
          l.save();
          return res.send();
        } catch (error) {
          console.log(error);
          res.status(500).send(error)
        }
      }

      postMarkTest =async (req, res) => {
        try {
          const { teacherId, marks, lessonId } = req.body;
          //Validations.
          //Check if user exists
            var query = { _id:lessonId };
            let query2 = { ...query, marks: { $elemMatch: { studentId: marks.id } } }
            if (Test.findOne(query2)) 
              await Test.update(query2, { $set: { 'marks.$.mark': marks.mark } })
            else
              await Test.update(query, { $addToSet: { marks: { studentId: marks.id, mark: marks.mark } } })
            return res.send();
        } catch (error) {
          res.status(500).send(error)
        }
      }

      postTest = async (req, res) => {
        try {
            const { teacher, nameSubject, date, file, comment, subject } = req.body;
            //Validations.
            //Check if user exists
            var marks = [];
            var myobj = new Test({ teacher, nameSubject, date, file, comment, subject, marks });
            await myobj.save();
            console.log("1 document inserted");
            // const token = generateAccessToken(user);
            // console.log("token", token);
            return res.send();
        } catch (error) {
            res.status(500).send(error)
        }
    }

    allMarks = async(req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
        const {subject} = req.query
        // MongoClient.connect(url, async function (err, db) {
        //     if (err)
        //         return res.status(500).send(err);
        //     var dbo = db.db("mySchoolDB");
            try {

                let marks = [...await Lessons.find({subject:subject}).toArray(),
                ...await Lessons.find({subject:subject}).toArray()];
                // db.close();
                return res.status(200).json(marks);
            } catch (error) {

                return res.status(500).json({ error: error })
            }
        // });
    }

    
}

module.exports = new TestController();



