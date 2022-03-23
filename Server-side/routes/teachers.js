

const express = require("express");
const router = express.Router();

const TeacherControllers = require("../controllers/teachers")
const UserControllers = require("../controllers/users")

router.post("/signup", UserControllers.signupTeacher);
router.get("/s_previousLessons/:subject", TeacherControllers.previousLessons);
router.get("/allLessons", /*checkUserMiddlware,*/ TeacherControllers.allLessons);
router.get("/all", /*checkUserMiddlware,*/ TeacherControllers.getallTeachers);
router.delete("/:teacherId", /*checkUserMiddlware,*/ TeacherControllers.deleteById);


module.exports = router;
