const mongoose = require('mongoose');
// import { isEmail } from 'validator';

const Schema = mongoose.Schema

const studentSchema = new Schema({

    subject: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: String,
    // email: { type: String, validate: [isEmail, 'invalid email'] },
    email: { type: String, unique: true },
    password: { type: String, required: true, minlength: 8 },
})

module.exports = mongoose.model('student', studentSchema)