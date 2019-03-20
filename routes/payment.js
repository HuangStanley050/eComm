const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment");

router.post("/", paymentController.makePayment);

module.exports = router;
