const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment");
const passport = require("passport");

router.post(
  "/",
  passport.authenticate("jwt-normal-user", { session: false }),
  paymentController.makePayment
);

module.exports = router;
