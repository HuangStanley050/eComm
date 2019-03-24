const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const filesRouter = require("./routes/files");
const paymentRouter = require("./routes/payment");
const authRouter = require("./routes/auth");

const cors = require("cors");

const app = express();
//const upload = multer({ storage: multer.memoryStorage() });

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
require("./config/passport")(passport);

app.use(cors());

app.use("/", indexRouter);
app.use("/api/file", filesRouter);
app.use("/api/auth", authRouter);
app.use("/api/payment", paymentRouter);
app.use(
  "/api/testifadmin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  //console.log(err.message);
  // render the error page
  console.log(err.message);
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});

module.exports = app;
