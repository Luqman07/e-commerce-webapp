const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const createApiError = require("../utils/helpers");
const userExist = require("../utils/auth");
const dbCon = require("../db");

const register = async (req, res, next) => {
  let { email, password, username } = req.body;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty())
      throw createApiError("form validaion failed", 422, errors.array);
    if (await userExist(email)) throw createApiError("email already in use");

    const hashedPwd = bcrypt.hash(password, 10);
    
    let sql = `INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${hashedPwd})`;
    dbCon.query(sql, (err, data) => {
        console.log('1 record inserted')
        res.status(201).json({message: 'Account Created', data: data})
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res, next) => {};

module.exports = { register, login };
