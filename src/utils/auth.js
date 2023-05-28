const { access } = require("fs");
const dbCon = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userExist = async (_email) => {
  const sql = "SELECT * FROM `users` WHERE `email` = ?";
  const users = dbCon.query(sql, [`${_email}`], (err, results, fields) => {
    if (err) throw err;
    return results;
  });

  return users._results.length === 0;
};

const getUser = (sql, searchParameter) => {
  return new Promise((resolve, reject) => {
    dbCon.query(sql, [`${searchParameter}`], (err, results, fields) => {
      err ? reject(err) : resolve(results[0]);
    });
  });
};

const generateTokens = async (user) => {
  try {
    const accessToken = jwt.sign(
      { username: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60s" }
    );
    const refreshToken = jwt.sign(
      { username: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    const sql = "UPDATE users SET refreshToken = ? WHERE id = ?";
    dbCon.query(
      sql,
      [refreshToken, user.id],
      function (error, results, fields) {
        if (error) throw error;
        // Return result
        console.log(results[0]);
      }
    );
    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { userExist, getUser, generateTokens };
