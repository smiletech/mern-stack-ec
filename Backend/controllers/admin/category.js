const category = require('../../model/category')
const Ctaegory = require('../../model/category')
const createCategory = async (req, res) => {
    try {
        const { name } = req.body
        const oldCat = await category.findOne({name})
        if(oldCat) return res.status(400).send({ message: 'Category Already Exist !', success: false, data: {} })
        const catData = await category.create({
            name
        })

        return res.status(201).send({ message: 'Category Created !', success: true, data: catData })
    } catch (error) {
        return res.status(500).send({ message: 'Something Went Wrong !', success: false, data: {} })
    }
}

module.exports = {
    createCategory
}