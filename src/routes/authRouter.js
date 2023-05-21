const express = require("express");
const router = express.Router();
const {register} = require('../controllers/authController')
const validateReg = require('../middleware/authValidators')


// Register
router.post("/register", validateReg, register);


module.exports = router;
