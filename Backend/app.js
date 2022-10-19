const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors({origin:'*'}))

const admin = require('./routes/admin')
const user = require('./routes/user')


app.use('/admin', admin)
app.use('/user', user)
module.exports=app