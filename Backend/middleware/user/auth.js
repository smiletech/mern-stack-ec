const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY
const userAuth = (req, res, next) => {
    const token = req.body.token || req.headers['x-access-token']
    if (!token) return res.status(403).send({ message: 'token is required for authentication !', success: false, data: {} })
    try {

        const decoded = jwt.decode(token, SECRET_KEY)
        if (!decoded) return res.status(403).send({ message: 'invalid token !', success: false, data: {} })

        req.user = decoded
        next()
    } catch (error) {
        return res.status(403).send({ message: 'invalid token !', success: false, data: {} })
    }
}

module.exports = userAuth