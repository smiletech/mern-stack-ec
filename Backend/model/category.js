const {Schema, model} = require('mongoose')

const categorySchema = new Schema({
    name:{type:String},
})

module.exports = model('categories', categorySchema)