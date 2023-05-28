const express = require("express");
const router = express.Router();
const handleRefreshToken = require('../controllers/refreshTokenController')
const validateReg = require('../middleware/authValidators')


// Creates new Access Token

router.post("/register", handleRefreshToken);


module.exports = router;
