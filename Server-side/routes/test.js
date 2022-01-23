var express = require('express');
var router = express.Router();

const TestController = require("../controllers/tests")

/* GET users listing. */

router.get("/allTests", TestController.allTests);
router.get("/viewTest", TestController.getTests);
router.get("/allTests", TestController.allTests);
router.get("/myTests", TestController.myTests);
router.post("/postMark", TestController.postMark);
router.post("/postMarkTest", TestController.postMarkTest);
router.post("/postTest", TestController.postTest);
router.get("/allMarks", TestController.allMarks);
router.post("/postFile", TestController.postFile);

module.exports = router;


