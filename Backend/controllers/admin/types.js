const Type = require('../../model/productType')
const createType = async (req, res) => {
    try {
        const {category, type } = req.body
        const oldType = await Type.findOne({
            category,
            type
        })
        if(oldType) return res.status(400).send({ message: 'Type Already Exist !', success: false, data: {} })
        const typeData = await Type.create({
            category,
            type
        })

        return res.status(201).send({ message: 'Type Created !', success: true, data: typeData })
    } catch (error) {
        return res.status(500).send({ message: 'Something Went Wrong !', success: false, data: {} })
    }
}

const getType = async (req, res) => {
    try {
        const {category } = req.body
        let obj = {}
        if(category){
            obj.category=category
        }
        const typeData = await Type.find(obj)

        return res.status(201).send({ message: 'Success !', success: true, data: typeData })
    } catch (error) {
        return res.status(500).send({ message: 'Something Went Wrong !', success: false, data: {} })
    }
}

module.exports = {
    createType,
    getType
}