const jwt = require('jsonwebtoken')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const Admin = require('../../model/admin')
const SECRET_KEY = process.env.SECRET_KEY

const login = async (req, res) => {
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
        const oldUser = await Admin.findOne({ email })
        if (!oldUser) return res.status(200).send({ message: 'Incorrect Email or Password', success: false, data: {} })
        console.log(await bcrypt.compare(password, oldUser.password));
        if (await bcrypt.compare(password, oldUser.password)) {
            let token = jwt.sign({ id: oldUser._id, email: oldUser.email, isAdmin: true }, SECRET_KEY)
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




}


module.exports = { login }