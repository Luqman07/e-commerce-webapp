const express = require("express");
const router = express.Router();
const {register} = require('../controller/authController')
const validateSignUp = require('../middleware/authValidators')


// Register
router.post("/register", validateSignUp, register);

module.exports = router;
