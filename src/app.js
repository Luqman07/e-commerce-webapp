const express = require('express')
const cors = require('cors')
const auth = require('./routes/authRouter')
// const dbCon = require('./db')

const app = express()

app.use(cors())

// built in middleware for formdata: to extract the parameter
app.use(express.urlencoded({extended: false}))

// middleware for json data
app.use(express.json())

// router
app.use("/api/auth", auth);

app.listen(5000, () => {
    console.log('Listening on port 5000')
})