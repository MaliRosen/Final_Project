

const express = require("express");
const router = express.Router();

const lessonsControllers = require("../controllers/lessons")

router.get("/s_previousLessons/:subject", lessonsControllers.previousLessons);
router.get("/allHw", lessonsControllers.allHw);
router.get("/allLessons", lessonsControllers.allLessons);
router.get("/allAttendance", lessonsControllers.allAttendance);

router.post("/postLesson", lessonsControllers.postLesson);
router.post("/postHw", lessonsControllers.postHw);
router.post("/attendance", lessonsControllers.attendance);

module.exports = router;
