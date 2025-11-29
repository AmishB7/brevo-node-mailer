const express = require("express");

const router = new express.Router();

const emailController = require("../../controllers/v1/email");

router.post("/", emailController.sendEmail);

module.exports = router;
