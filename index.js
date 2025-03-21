const express = require('express')
const { errorHandler } = require('./middlewares/errorHandler')
const dbConnect = require("./config/db")

const authRouter = require('./routes/auth/index')
const adminRouter = require('./routes/admin/index')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(errorHandler)

app.use("/api/v1", authRouter)
app.use("/api/v1", adminRouter)

dbConnect()
app.listen(port, () => {
    console.info(`Server running on ${port}`)
})

app.get('/', (req, res) => {
    return res.status(200).json({
        message: "Welcome to ScholarGuide API"
    })
})

app.use((req, res) => {
    return res.status(404).json({
        message: "This endpoint does not exist yet!"
    })
})



module.exports = app