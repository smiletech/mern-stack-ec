const Product = require('../../model/product')
const Joi = require('joi')
const addProduct = async (req, res) => {
    try {
        const payload = req.body
        const schema = Joi.object().keys({
            product_name: Joi.string().required(),
            category: Joi.string().required(),
            type: Joi.string().required(),
            qty: Joi.number().required(),
            price: Joi.number().required(),
            details: Joi.string().required(),
        })

        const result = schema.validate(payload)
        const { value, error } = result
        const valid = error == null
        if (!valid) {
            return res.status(200).send({ message: error.message, success: false, data: {} })
        }
        else {
            const { product_name, qty, price, details, category, type } = payload
            const productData = await Product.create({
                product_name,
                category,
                type,
                qty,
                price,
                details
            })
            return res.status(200).send({ message: 'Product Added', success: true, data: productData })
        }
    } catch (error) {
        return res.status(200).send({ message: error.message, success: false, data: {} })
    }
}


const getAllProduct = async (req, res) => {
    try {
        const payload = req.body
        const schema = Joi.object().keys({
            category: Joi.string().allow(""),
            type: Joi.string().allow(""),
        })

        const result = schema.validate(payload)
        const { value, error } = result
        const valid = error == null
        if (!valid) {
            return res.status(200).send({ message: error.message, success: false, data: {} })
        }
        else {
            const {category, type} = req.body
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
                        'category.name': category,
                        'type.type': type
                    }
                })
            }

            else if (category) {
                query.push({
                    '$match': {
                        'category.name': category,
                    }
                })
            }
            const productData = await Product.aggregate(query)
            if (!productData.length) return res.status(200).send({ message: 'Product Not Found', success: false, data: [] })
            return res.status(200).send({ message: 'Success', success: true, data: productData })
        }
    } catch (error) {
        return res.status(200).send({ message: error.message, success: false, data: {} })
    }
}

module.exports = {
    addProduct,
    getAllProduct
}