const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWTSECRET;

exports.regiser = (req, res, next) => {
  //console.log(req.body);
  const { name, email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (user) {
        const error = new Error();
        error.message = "user already signed up";
        error.status = 400;
        throw error;
      }

      return bcrypt.hash(password, 12);
    })
    .then(hashedpassword => {
      const newUser = User({
        name,
        email,
        password: hashedpassword
      });
      return newUser.save();
    })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      next(err);
    });
};
exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let foundUser;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        const error = new Error("user not in the system");
        error.status = 401;
        throw error;
      }
      foundUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(result => {
      // console.log(result);
      // res.send("finished");
      if (!result) {
        const error = new Error("Password don't match");
        error.status = 400;
        throw error;
      }
      const payload = {
        id: foundUser.id,
        email: foundUser.email
      };
      const token = jwt.sign(payload, jwt_secret, { expiresIn: "1h" });
      res.json({ login: "succcess", token });
    })
    .catch(err => next(err));
};
