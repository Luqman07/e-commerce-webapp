const express = require("express");
const router = express.Router();
const {register, login} = require('../controllers/authController')
const validateReg = require('../middleware/authValidators')


// Register
router.post("/register", validateReg, register);
router.post("/login", validateReg, login);


module.exports = router;
