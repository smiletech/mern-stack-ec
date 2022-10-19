const { Router } = require('express')
const { createCategory } = require('../controllers/admin/category')
const { createType, getType } = require('../controllers/admin/types')
const { login } = require('../controllers/admin/auth')
const { getAllProduct } = require('../controllers/user/product')
const { addProduct } = require('../controllers/admin/product')
const auth = require('../middleware/admin/auth')

const adminRouter = Router()


adminRouter.post('/login', login)
adminRouter.post('/addProduct', auth, addProduct)
adminRouter.post('/addCategory', auth, createCategory)
adminRouter.post('/addType', auth, createType)
adminRouter.post('/getType', auth, getType)
adminRouter.post('/getAllProduct', auth, getAllProduct)


module.exports = adminRouter