require('dotenv').config()
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const app = express()
// routes
const authRoute = require('./routes/auth')
const innovationsRoute = require('./routes/innovation')

// connect to db
mongoose.connect(process.env.DB_CONNECTION)
.then(() => console.log('successfully connected to db'))

// middlewares
app.use(cookieParser())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(cors({
    credentials: true,
    origin: ['http://127.0.0.1:8084', 'http://127.0.0.1:3000']
}))

// app routes
app.use('/api/auth', authRoute)
app.use('/api/innovations', innovationsRoute)

app.listen(process.env.PORT, () => console.log('server up and running'))