const jwt = require('jsonwebtoken')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const User = require('../../model/user')
const SECRET_KEY = process.env.SECRET_KEY

const login = async (req, res) => {
    try {
        const payload = req.body
    const schema = Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    })

    const result = schema.validate(payload)
    const { value, error } = result
    const valid = error == null
    if (!valid) {
        return res.status(200).send({ message: error.message, success: false, data: {} })
    }
    else {
        const { email, password } = payload
        const oldUser = await User.findOne({ email })
        if (!oldUser) return res.status(200).send({ message: 'Incorrect Email or Password', success: false, data: {} })
        if (await bcrypt.compare(password, oldUser.password)) {
            let token = jwt.sign({ id: oldUser._id, email: oldUser.email }, SECRET_KEY)
            let data ={
                first_name:oldUser.first_name,
                last_name:oldUser.last_name,
                email:oldUser.email,
                token
            }
            return res.status(200).send({ message: 'Login Success', success: true, data })
        }
        else {
            return res.status(200).send({ message: 'Incorrect Email or Password', success: false, data: {} })
        }
    }
    } catch (error) {
        return res.status(200).send({ message: error.message, success: false, data: {} })
    }




}



const register = async (req, res) => {
    try {
        const payload = req.body
    const schema = Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    })

    const result = schema.validate(payload)
    const { value, error } = result
    const valid = error == null
    if (!valid) {
        return res.status(200).send({ message: error.message, success: false, data: {} })
    }
    else {
        const {first_name, last_name, email, password } = payload
        const oldUser = await User.findOne({ email })
        if (oldUser) return res.status(200).send({ message: 'User already Exist !', success: false, data: {} })
        const encPassword = await bcrypt.hash(password, 10)
        const userData = await User.create({
            first_name,
            last_name,
            email,
            password:encPassword
        })
        let payloadData ={
            first_name,
            last_name,
            email
        }
        return res.status(200).send({ message: 'Register Successful', success: true, data:payloadData })
    }

    } catch (error) {
        return res.status(200).send({ message: error.message, success: false, data: {} })
    }



}


module.exports = { login , register}