const express = require('express')
const cors = require('cors')
const dbCon = require('./db')

const app = express()
app.use(cors())
app.get('/', (req, res) => {
    res.status(200).json({name: 'Luqman'})
})
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM userauth'
    dbCon.query(sql, (err, data) => {
        if(err) res.status(404).json(err)
        res.status(200).json(data)
    })
})

app.listen(5000, () => {
    console.log('Listening on port 5000')
})