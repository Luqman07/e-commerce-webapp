const express = require("express");
const router = express.Router();
const dbCon = require('../db');
const { log } = require("console");

router.get("/users", (req, res, next) => {
  const sql = `SELECT * FROM users;`;

  dbCon.query(sql, (err, data) => {
    if (err) throw err;
    log(data)
    res.status(200).json(data);
  });
});

module.exports = router;
