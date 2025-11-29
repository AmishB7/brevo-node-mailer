const express = require("express");

const router = new express.Router();
const sendEmailRoute = require("./send-email");
const verifyEmailRoute = require("./verify-email");

router.use("/email", sendEmailRoute);

router.use("/email/verify", verifyEmailRoute);

module.exports = router;
