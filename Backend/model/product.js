const {Schema, model, Types} = require('mongoose')


const productSchema = new Schema({
    product_name:{type:String, required:true},
    category:{type:Types.ObjectId,ref:'categories', required:true},
    type:{type:Types.ObjectId,ref:'types', required:true},
    qty:{type:Number, required:true},
    price:{type:Number, required:true},
    details:{type:String, required:true},
})

module.exports = model('products', productSchema)