const { verifyToken } = require("../utils/token")
const { asyncHandler } = require("./errorHandler")

// this protects all token related routes
const protect = asyncHandler(async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
        return res.status(401).json({
            message: "Access denied. No token provided!"
        })
    }

    try {
        const decodedToken = verifyToken(token)
        req.user = decodedToken
        next()
        
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Access denied. Token has expired!"
            })
        }
        return res.status(401).json({
            message: "Access denied. Invalid token!",
        })
    }
})

// admin route access
const isAdmin = (req, res, next) => {
    const user = req.user
    try {

        if (user && (user.user.role === 'admin')) {
            next()
        } else {
            return res.status(403).json({
                message: "Access denied, Admin only!",
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred!",
            error: error.message
        })
    }

}

// teacher route access
const isTeacher = (req, res, next) => {
    const user = req.user
    try {
        if (user && (user.user.role === "teacher" || user.user.role === "admin")) {
            next()
        } else {
            return res.status(403).json({
                message: "Access denied, Teacher only!",
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred!",
            error: error.message
        })
    }
    
}

module.exports = {
    protect,
    isAdmin,
    isTeacher
}