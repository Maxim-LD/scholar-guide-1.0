const express = require('express')
const { validateUser } = require('../../validations/authValidator')
const login = require('../../controllers/auth/login')
const signup = require('../../controllers/auth/signUp')

const authRouter = express.Router()

authRouter.post("/signup", signup)
authRouter.post("/login", validateUser, login)

module.exports = authRouter