const express = require('express')
const cors = require('cors')
const auth = require('./routes/authRouter')
const users = require('./routes/userRouter')

const app = express()

app.use(cors())

// built in middleware for formdata: to extract the parameter
app.use(express.urlencoded({extended: false}))

// middleware for json data
app.use(express.json())

// routes
app.use("/api/auth", auth);
app.use("/api", users);

app.get('/', (req, res) => {
    res.status(200).send('Welcome to OJA website')
}) 

app.listen(5000, () => {
    console.log('Listening on port 5000')
})