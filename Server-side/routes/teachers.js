

const express = require("express");
const router = express.Router();

const TeacherControllers = require("../controllers/teachers")
const UserControllers = require("../controllers/users")

router.post("/signup", UserControllers.signupTeacher);
router.get("/s_previousLessons/:subject", TeacherControllers.previousLessons);
router.get("/allTeachers", /*checkUserMiddlware,*/ TeacherControllers.allTeachers);


module.exports = router;
