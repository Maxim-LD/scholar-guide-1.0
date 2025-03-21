const errorHandler = (err, req, res, next) => {

    const statusCode = err.status || 500
    const message = err.message || "Something went wrong!"

    console.error(JSON.stringify({
        "Message": message,
        "Status": statusCode,
        "Time": new Date().toISOString()
    }, null, 2))

    res.status(statusCode).json({
        success: false,
        message: message
    })
}

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

module.exports = {
    errorHandler,
    asyncHandler
}