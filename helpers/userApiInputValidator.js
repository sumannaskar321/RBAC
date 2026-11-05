const { check } = require('express-validator');


exports.registerValidator = [
  check("name", "Name is required.").not().isEmpty(),
  check("email", "Provide a valid Email.")
    .isEmail()
    .normalizeEmail({ gmail_removes_dot: true }),
  check("password", "Password is required.").not().isEmpty(),
];


exports.loginValidator = [
  check("email", "Provide a valid Email.")
    .isEmail()
    .normalizeEmail({ gmail_removes_dot: true }),
  check("password", "Password is required.").not().isEmpty(),
];


