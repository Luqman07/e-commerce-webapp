const dbCon = require("../db");

const userExist = async _email => {
    const sql = `SELECT email FROM users WHERE email=${_email}`
    
    const user = dbCon.query(sql, (err, data) => {
        if(err) throw err
        return data  
    })
    if (user) {
      return user;
    }
    return false;
};

module.exports = userExist