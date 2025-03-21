const express = require('express')
const listUsers = require('../../controllers/admin/getUsers')
const { protect, isAdmin } = require('../../middlewares/authMiddleware')

const adminRouter = express.Router()

adminRouter.get("/admin/get-users/:id?", protect, isAdmin, listUsers)

module.exports = adminRouter