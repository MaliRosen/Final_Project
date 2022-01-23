var express = require('express');
var router = express.Router();

const UserControllers = require("../controllers/users")

/* GET users listing. */

router.get("/login", UserControllers.login);
router.post("/loginWithToken", UserControllers.loginWithToken);
router.post("/signup", UserControllers.signup);
router.post("/forgetPassword", UserControllers.forgetPassword);
module.exports = router;


