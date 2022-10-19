const Product = require('../../model/product')
const Joi = require('joi')
const Cart = require('../../model/cart')
const Order = require('../../model/order')
const {Types} = require('mongoose')
const myPagination = require('../../common/pagination')



const getAllProduct = async (req, res) => {
    try {
        const payload = req.body
        const schema = Joi.object().keys({
            category: Joi.string().allow(""),
            type: Joi.string().allow(""),
            limit: Joi.number().allow(),
        })

        const result = schema.validate(payload)
        const { value, error } = result
        const valid = error == null
        if (!valid) {
            return res.status(200).send({ message: error.message, success: false, data: {} })
        }
        else {
            let {category, type, limit=30} = req.body
            console.log(req.body);
            let query = [
                {
                    '$lookup': {
                        'from': 'categories',
                        'localField': 'category',
                        'foreignField': '_id',
                        'as': 'category'
                    }
                }, {
                    '$unwind': {
                        'path': '$category',
                        'preserveNullAndEmptyArrays': true
                    }
                }, {
                    '$lookup': {
                        'from': 'types',
                        'localField': 'type',
                        'foreignField': '_id',
                        'as': 'type'
                    }
                }, {
                    '$unwind': {
                        'path': '$type',
                        'preserveNullAndEmptyArrays': true
                    }
                }
            ]

            if (type && category) {
                query.push({
                    '$match': {
                        'category._id':   Types.ObjectId(category),
                        'type._id':  Types.ObjectId(type)
                    }
                })
            }
            else if (category) {
                query.push({
                    '$match': {
                        'category._id':  Types.ObjectId(category),
                    }
                })
            }
            const productData = await Product.aggregate(query)
            console.log(type);
            const paginatedData = myPagination(productData, 1, limit)
            console.log(paginatedData);

            return res.status(200).send({ message: 'Success', success: true, data: paginatedData })
        }
    } catch (error) {
        console.log(error);
        return res.status(200).send({ message: error.message, success: false, data: {} })
    }
}




const placeOrder = async (req, res) => {
    try {
        const payload = req.body
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            mobile: Joi.number().required(),
            address: Joi.string().required(),
            pin: Joi.number().required(),
        })

        const result = schema.validate(payload)
        const { value, error } = result
        const valid = error == null
        if (!valid) {
            return res.status(200).send({ message: error.message, success: false, data: {} })
        }
        else {
            const { name, mobile, address, pin } = payload

            const user = req.user
            const cartData = await Cart.findOne({ user_id: user.id })
            if (cartData && cartData.products.length) {
                const products = cartData.products

                

                for (let i = 0; i < products.length; i++) {
                    const verifyProduct = await Product.findOne({ _id: products[i].product_id, qty: { $gte: products[i].qty } })
                    if (!verifyProduct) return res.status(200).send({ message: 'Please Remove Sold OUT Product', success: false, data: {} })
                }

                for (let i = 0; i < products.length; i++) {
                    await Order.create({
                        user_id: user.id,
                        name,
                        mobile,
                        address,
                        pin,
                        product_id: products[i].product_id,
                        qty: products[i].qty,
                        price: products[i].price
                    })
                    await Product.findOneAndUpdate({ _id: products[i].product_id }, { $inc: { qty: -products[i].qty } })
                    await Cart.findOneAndUpdate({ user_id: user.id }, { $set: { products: [], price: 0 } })

                }
                return res.status(200).send({ message: 'Order Place Successful', success: true, data: {} })
            }
            else{
                return res.status(200).send({ message: 'Cart is Empty', success: false, data: {} })
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(200).send({ message: error.message, success: false, data: {} })
    }
}




const getOrder = async (req, res) => {
    try {
        const user = req.user
        const orderList = await Order.find({user_id:user.id}).populate({ path: 'product_id',  select: '_id product_name brand'  })
        return res.status(200).send({ message:'Success', success: true, data: orderList })
    } catch (error) {
        console.log(error);
        return res.status(200).send({ message: error.message, success: false, data: {} })
    }
}
module.exports = {
    getAllProduct,
    placeOrder,
    getOrder
}