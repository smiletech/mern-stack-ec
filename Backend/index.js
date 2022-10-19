require('dotenv').config()
const app = require('./app')
const port = process.env.PORT
require('./config/db')()
app.listen(port, ()=>{console.log(`Server Running on Port ${port}`)})