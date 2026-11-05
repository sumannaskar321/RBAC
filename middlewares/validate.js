const { validationResult } = require("express-validator");

exports.validate = (validations) => {
  return async (req, res, next) => {
    // Run all incoming validation rules
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        msg: "Invalid Inputs.",
        errors: errors.array(),
      });
    }
    next();
  };
};
