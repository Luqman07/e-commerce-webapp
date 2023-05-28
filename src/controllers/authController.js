const express = require("express");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { createApiError } = require("../utils/helpers");
const { userExist, getUser, generateTokens } = require("../utils/auth");
const dbCon = require("../db");
require("dotenv").config();

const register = async (req, res, next) => {
  let { email, password, username } = req.body;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty())
      throw createApiError("form validaion failed", 422, errors.array);

    if (await userExist(email))
      throw createApiError("email already in use", 400);

    const hashedPwd = await bcrypt.hash(password, 10);
    const user = {
      email,
      password: hashedPwd,
      username,
    };
    let sql = `INSERT INTO users SET ? `;
    dbCon.query(sql, user, (err, results, fields) => {
      if (err) throw err;
      res.status(201).json({ message: "Account Created", data: results });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const sql = "SELECT * FROM users WHERE email = ?";

    const user = await getUser(sql, email);
    if (!user) throw createApiError("User not found", 401);

    const match = await bcrypt.compare(
      password.toString(),
      user.password.toString()
    );
    delete user["password"];

    if (match) {
      const {accessToken, refreshToken} = await generateTokens(user)
      console.log(accessToken)
      console.log(refreshToken)
      res.json({ message: `user ${user.username} logged in`, data: {...user, accessToken, refreshToken} });
    } else {
      res.status(401);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
