const mysql = require('mysql')
const dbCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user'
})

dbCon.connect((err) => {
    if(err) throw err;
    console.log('Connected to database')
})


module.exports = dbCon