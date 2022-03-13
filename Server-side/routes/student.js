const express = require("express");
const router = express.Router();

const StudentsControllers = require("../controllers/students")


router.get("/allStudents", StudentsControllers.allStudent);
router.get("/marks/:studentId", StudentsControllers.getMarks);

module.exports = router;
