const express = require("express");
const router = express.Router();
const historyController = require("../controllers/history");
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt-normal-user", { session: false }),
  historyController.getHistory
);

module.exports = router;
