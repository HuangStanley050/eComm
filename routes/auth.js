const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router
  .post("/regiser", authController.regiser)
  .post("/login", authController.login);

module.exports = router;
