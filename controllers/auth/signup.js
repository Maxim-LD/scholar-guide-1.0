const bcrypt = require('bcryptjs')
const Users = require('../../models/User')
const { asyncHandler } = require("../../middlewares/errorHandler")

const signup = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body
  
  if (!email || !password || !role) {
    return res.status(400).json({
        error: "All fields are required"
    })
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const newUser = new Users({
      email,
      password: hashedPassword,
      role,
  })

  await newUser.save()
  return res.status(201).json({
      message: "Account created succesfully!",
      user: newUser,
  })
})

module.exports = signup
