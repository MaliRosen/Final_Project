const mongoose = require('mongoose');
const Schema = mongoose.Schema

const lessonsSchema = new Schema({

    teacher: { type: String, required: true },
    numLesson: { type: Number, required: true },
    lessonName: { type: String, required: true },
    file: String,
    date:   Date,
    notes: String,
    time: String,
    subject: {type: String, unique:true},
    arrHw: [
        {
            studentId: { type: Schema.Types.ObjectId, ref: 'student', unique: true },
            mark: Number,
            file: String,
        }
    ],
    arrAttendance:[
        {
            studentId: { type: Schema.Types.ObjectId, ref: 'student', unique: true },
            date: Date,
            isLate: Boolean
        }
    ],
    hwQuestions: [
        {
            nameSubject: String,
            date: Date,
            file: String,
            comments: String,
            question1: String,
            question2: String,

        }
    ]
})
module.exports = mongoose.model('lessons', lessonsSchema)