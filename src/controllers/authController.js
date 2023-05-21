const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { createApiError } = require("../utils/helpers");
const userExist = require("../utils/auth");
const dbCon = require("../db");

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
      username
    }
    let sql = `INSERT INTO users SET ? `;
    dbCon.query(sql, user, (err, results, fields) => {
      if(err) throw err
      console.log("1 record inserted");
      res.status(201).json({ message: "Account Created", data: results });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res, next) => {

};

module.exports = { register, login };
