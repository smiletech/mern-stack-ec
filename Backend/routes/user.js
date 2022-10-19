const { Router } = require('express')

const userRouter = Router()
const auth = require('../middleware/user/auth')
const { addtoCart, getCart, removeProductFromCart } = require('../controllers/user/cart')
const { login, register } = require('../controllers/user/auth')
const { getAllProduct, placeOrder, getOrder } = require('../controllers/user/product')
const { getAllCategory, getTypeById } = require('../controllers/user/category')

userRouter.post('/login', login)
userRouter.post('/register', register)
userRouter.post('/getAllProduct', auth, getAllProduct)
userRouter.post('/addtoCart', auth, addtoCart)
userRouter.post('/getCart', auth, getCart)
userRouter.post('/removeProductFromCart', auth, removeProductFromCart)
userRouter.post('/placeOrder', auth, placeOrder)
userRouter.post('/getOrder', auth, getOrder)
userRouter.post('/getAllCategory', auth, getAllCategory)
userRouter.post('/getTypeById/:id', auth, getTypeById)


module.exports = userRouter