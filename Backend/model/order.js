const {Schema, model, Types} = require('mongoose')


const orderSchema = new Schema({
    user_id:{type:Types.ObjectId, ref:'user'},
    name:{type:String, required:true},
    mobile:{type:String, required:true},
    address:{type:String, required:true},
    pin:{type:Number, required:true},
    product_id:{type:Types.ObjectId, ref:'products'},
    qty:{type:Number, required:true},
    price:{type:Number, required:true},
})

module.exports = model('orders', orderSchema)