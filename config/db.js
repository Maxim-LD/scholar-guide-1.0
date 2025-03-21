const mongoose = require('mongoose')
const { asyncHandler } = require('../middlewares/errorHandler')
require('dotenv').config()

const dbConnect = asyncHandler(async () => {
    await mongoose.connect(process.env.MONGODB_URL)
    console.info("Database connected successfully!")
})

module.exports = dbConnect