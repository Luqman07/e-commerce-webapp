const validator = require("validator");

// function for valiating email and password when user register
const validateReg = (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password)
  if (!validator.isEmail(email) && !password !== "")
    throw new Error("Email or password is invalid");

  next();
};

// const {body, check} = require("express-validator");

// const validateSignUp = check("email")
//   ? [
//       body("email")
//         .trim()
//         .isEmail()
//         .withMessage("Please enter a valid email!")
//         .toLowerCase(),
//       body("password").trim().not().isEmpty(),
//     ]
//   : [];

module.exports = validateReg;
