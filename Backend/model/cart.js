const {Schema, model, Types} = require('mongoose')


const cartSchema = new Schema({
    user_id:{type:Types.ObjectId, ref:'user'},
    products:[{
        product_id:{type:Types.ObjectId, ref:'products'},
        price:{type:Number},
        qty:{type:Number}
    }],
    price:{type:Number, required:true},
})

module.exports = model('carts', cartSchema)