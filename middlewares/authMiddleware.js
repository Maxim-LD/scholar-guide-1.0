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

    const decodedToken = verifyToken(token)
    req.user = decodedToken
    next()
})

// admin route access
const isAdmin = (req, res, next) => {
    const user = req.user

    if (user && (user.user.role === 'admin')) {
        next()
        
    } else {
        return res.status(403).json({
            message: "Access denied, Admin only!",
        })
    }

}

// teacher route access
const isTeacher = (req, res, next) => {
    const user = req.user

    if (user && (user.user.role === "teacher" || user.user.role === "admin")) {
        next()
        
    } else {
        return res.status(403).json({
            message: "Access denied, Teacher only!",
        })
    }
    
}

module.exports = {
    protect,
    isAdmin,
    isTeacher
}