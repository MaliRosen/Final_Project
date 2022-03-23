const express = require("express");
const router = express.Router();

const StudentsControllers = require("../controllers/students")


router.get("/allBysubject", StudentsControllers.getAllBysubject);
router.get("/all", StudentsControllers.getAll);
router.get("/marks/:studentId", StudentsControllers.getMarks);
router.delete("/:studentId", /*checkUserMiddlware,*/ StudentsControllers.deleteById);

module.exports = router;
