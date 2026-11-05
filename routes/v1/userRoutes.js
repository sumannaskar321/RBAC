const { Router } = require('express');
const userController = require('../../controllers/v1/userController.js');
const { registerValidator, loginValidator } = require("../../helpers/userApiInputValidator.js");
const { validate } = require('../../middlewares/validate.js');
const { verifyAuthToken } = require('../../middlewares/authentication.js');

// all routes centralized manner (individual api routes)
const router = Router();

router.post('/register', validate(registerValidator), userController.registerUser );
router.post('/login', validate(loginValidator), userController.loginUser)
router.get("/profile", verifyAuthToken, userController.getProfile);

module.exports = router;