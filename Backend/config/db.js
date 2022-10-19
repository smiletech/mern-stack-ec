const mongoose = require('mongoose')
const dotenv = require("dotenv");
dotenv.config();

const URL = process.env.MONGO_URL
const connect =()=>{
    
mongoose.connect(URL, {})
.then(()=>{
    console.log(`MongoDB Connected Successfully`);
})
.catch((err)=>{
    console.log(err);
    process.exit(1)
})
}

module.exports=connect