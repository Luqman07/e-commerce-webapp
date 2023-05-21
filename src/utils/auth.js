const dbCon = require("../db");

const userExist = async _email => {
    const sql = `SELECT email FROM users WHERE email= "${_email}";`
    
    const users = dbCon.query(sql, (err, results, fields) => {
        if(err) throw err
        return results;
    })
    return users.length > 1 
};

module.exports = userExist