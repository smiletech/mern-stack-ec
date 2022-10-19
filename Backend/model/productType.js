const {Schema, model, Types} = require('mongoose')

const productTypeSchema = new Schema({
    category:{type:Types.ObjectId, ref:'categories'},
    type:{type:String},
})

module.exports = model('types', productTypeSchema)