require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
// middlewares
const bodyparser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
// routes
const authRoute = require('./routes/auth')
const inventionsRoute = require('./routes/invention')
const assetsRoute = require('./routes/assets')

// connect to db
mongoose.connect(process.env.DB_CONNECTION)
.then(() => console.log('successfully connected to db'))

// middlewares
app.use(cookieParser())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(cors({
    credentials: true,
    // temp origins:
    origin: [
        'http://localhost:8084', 
        'http://localhost:3000', 
        'http://localhost:4000',
    ]
}))

// app routes
app.use('/api/auth', authRoute)
app.use('/api/inventions', inventionsRoute)
app.use('/api/inventions/assets', assetsRoute)

app.listen(process.env.PORT, () => console.log('server up and running'))