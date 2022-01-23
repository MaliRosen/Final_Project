const express = require("express");
const router = express.Router();
const MailController = require("../controllers/mail")





router.post("/mail", MailController.mailSender);

module.exports = router;
