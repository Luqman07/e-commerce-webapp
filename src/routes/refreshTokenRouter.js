const express = require("express");
const router = express.Router();
const handleRefreshToken = require('../controllers/refreshTokenController')
const validateReg = require('../middleware/authValidators')


// Access Token

router.get("/register", handleRefreshToken);


module.exports = router;
