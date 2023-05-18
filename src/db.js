const mysql = require('mysql')
const dbCon = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'ecommercedb'
})

dbCon.connect((err) => {
    if(err) throw err;
    console.log('Connected to database')
})


module.exports = dbCon