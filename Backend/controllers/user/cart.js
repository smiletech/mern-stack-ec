const Joi = require('joi')
const Cart = require('../../model/cart')
const Product = require('../../model/product')


const addtoCart = async (req, res) => {
    try {
        const payload = req.body
        const schema = Joi.object().keys({
            product_id: Joi.string().required(),
            qty: Joi.number().required(),
        })

        const result = schema.validate(payload)
        const { value, error } = result
        const valid = error == null
        if (!valid) {
            return res.status(200).send({ message: error.message, success: false, data: {} })
        }
        else {
            const { product_id, qty } = payload
            const user = req.user


            let productDetails = await Product.findOne({ _id: product_id })
            if (productDetails.qty >= qty) {
                const cartData = await Cart.findOne({ user_id: user.id })
                var productData
                if (!cartData) {
                    await Cart.create({
                        user_id: user.id,
                        products: [{ product_id, price: productDetails.price * qty, qty: qty }],
                        price: productDetails.price * qty
                    })
                    productData = await Cart.findOne({ user_id: user.id }).populate({ path: 'products', populate: { path: 'product_id', select: '_id product_name' } })
                }
                else {
                    let cartProduct = await cartData.products
                    let findProduct = cartProduct.find(c => c.product_id == product_id)
                    if (findProduct) {
                        productData = await Cart.findOneAndUpdate({
                            user_id: user.id,
                            'products.product_id': product_id
                        }, {
                            $set: { 'products.$.qty': qty, 'price': (cartData.price - findProduct.price) + productDetails.price * qty, 'products.$.price': productDetails.price * qty }

                        },
                            { new: true }).populate({ path: 'products', populate: { path: 'product_id', select: '_id product_name' } })
                    }
                    else{
                        productData = await Cart.findOneAndUpdate({
                            user_id:user.id,
                        },{
                            $push:{products:{product_id, price:productDetails.price*qty, qty:qty}}, $set:{'price':cartData.price+productDetails.price*qty}
                        },{
                            new:true
                        }).populate({ path: 'products', populate: { path: 'product_id', select: '_id product_name' } })
                    }
                }
            return res.status(200).send({ message: 'Added to Cart', success: true, data: productData })

            }
            else{
                return res.status(200).send({ message: 'Please Select Valid Qty', success: false, data: {} })
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(200).send({ message: error.message, success: false, data: {} })
    }
}



const getCart = async (req, res) => {
    try {
       const user = req.user
       const cartDetails = await Cart.findOne({user_id:user.id}).populate({ path: 'products', populate: { path: 'product_id', select: '_id product_name brand qty' } })
       return res.status(200).send({ message:'Success', success: true, data: cartDetails })
    } catch (error) {
        console.log(error);
        return res.status(200).send({ message: error.message, success: false, data: {} })
    }
}


const removeProductFromCart = async (req, res) => {
    try {
       const user = req.user
       const {product_id} = req.body
       const productDetails = await Cart.findOne({user_id:user.id, 'products.product_id':product_id})
       let products = productDetails.products
       let findProduct = products.find(p=>p.product_id==product_id)
       if(findProduct){
        const cartDetails = await Cart.findOneAndUpdate({user_id:user.id, 'products.product_id':product_id},{$pull:{products:{product_id:product_id}}, $set:{price:productDetails.price-findProduct.price}},{new:true})
        .populate({ path: 'products', populate: { path: 'product_id', select: '_id product_name brand qty' } })
        return res.status(200).send({ message:'Success', success: true, data: cartDetails })
       }
       
    } catch (error) {
        console.log(error);
        return res.status(200).send({ message: error.message, success: false, data: {} })
    }
}
module.exports = {
    addtoCart,
    getCart,
    removeProductFromCart
}