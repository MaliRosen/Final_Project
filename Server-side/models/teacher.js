const mongoose = require('mongoose');
const Schema = mongoose.Schema

const teacherSchema = new Schema({

    subject: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: String,
    id: String,
    email: String,
    password: { type: String, required: true },


})
module.exports = mongoose.model('teacher', teacherSchema)