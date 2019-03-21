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
        error.status = 404;
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
exports.login = (req, res, next) => {};
