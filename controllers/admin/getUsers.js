const mongoose = require('mongoose')
const { asyncHandler } = require("../../middlewares/errorHandler")
const Users = require("../../models/User")

const listUsers = asyncHandler(async (req, res) => {
    const id = req.params.id

    if (id) {
         // Validate the id format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID format!"
            })
        }
        const user = await Users.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }

        return res.status(200).json({
            success: true,
            user: {
                id: user._id,
                email: user.email,
            }
        })

    } else {
            const users = await Users.find().sort({ createdAt: -1 })
        if (!users || users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No user found!"
            })
        }

        const response = users.map((user) => ({
            id: user._id,
            email: user.email,
        }))

        return res.status(200).json({
            success: true,
            count: users.length,
            users: response
        })
    }
    
})

module.exports = listUsers