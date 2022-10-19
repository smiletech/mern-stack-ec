const Category = require('../../model/category')
const Type = require('../../model/productType')
const getAllCategory = async(req, res)=>{
    try {
        const catData = await Category.find()
        return res.status(200).send({message:'Success !', success:true, data:catData})
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Internal Server Error !', success:false, data:{}})
    }
}

const getTypeById = async(req, res)=>{
    try {
        const {id}= req.params
        const typeData = await Type.find({category:id})
        return res.status(200).send({message:'Success !', success:true, data:typeData})
    } catch (error) {
        return res.status(500).send({message:'Internal Server Error !', success:false, data:{}})
    }
}

module.exports ={
    getAllCategory,
    getTypeById
}