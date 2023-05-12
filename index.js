const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

require('dotenv').config()

const authRouter = require('./src/routes/auth')
const rmeRouter = require('./src/routes/rme')
const roleRouter = require('./src/routes/role')
const restRouter = require('./src/rest/rest')

const app = express()

app.use(cookieParser())
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/v1/auth', authRouter)
app.use('/v1/rme', rmeRouter)
app.use('/v1/role', roleRouter)
app.use('/v1/rest', restRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`)
})

module.exports = app