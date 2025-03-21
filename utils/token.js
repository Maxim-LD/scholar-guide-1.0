const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretKey = process.env.SECRET_KEY

const generateToken = (user) => {
    const payload = {
        user: {
            id: user._id.toString(),
            role: user.role
        }
    }

    const options = { expiresIn: "2m" }

    return jwt.sign(payload, secretKey, options)
}

const verifyToken = (token) => {
    return jwt.verify(token, secretKey)
}

module.exports = {
    generateToken,
    verifyToken
}