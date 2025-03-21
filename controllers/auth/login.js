const bcrypt = require('bcryptjs')
const { asyncHandler } = require('../../middlewares/errorHandler')
const Users = require('../../models/User')
const { generateToken } = require('../../utils/token')


const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // check if user exists on the database
    const userExist = await Users.findOne({ email })
    if (!userExist) {
        return res.status(404).json({
            success: false,
            message: "User not found!",
        })
    }

    const verifyPassword = bcrypt.compare(password, userExist.password)
    if (!verifyPassword) {
        return res.status(401).json({
            success: false,
            message: "Incorrect email or password!"
        })
    }

    // generate token for role based access and session management
    const token = generateToken(userExist)

    // store token in cookie role based access
    const maxAge = 2 * 60 // 2 hours expiration
    res.cookie("jwt-login", token, {
        maxAge: maxAge * 1000 // in milliseconds
    })

    return res.status(200).json({
        success: true,
        message: "Logged in successfully",
        data: {
            token: token,
            user: userExist.role,
        }
    })
})

module.exports = login