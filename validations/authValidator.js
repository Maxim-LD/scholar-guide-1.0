const Joi = require('joi')

const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      
    }).options({ abortEarly: false})


const validator = (validationSchema) => (req, res, next) => {
    try {
        const result = validationSchema.validate(req.body)
        if (result.error) {
            return res.status(400).json({
                success: false,
                message: "Validation error!",
                data: result.error.details.map((error) => error.message)
            })
        }

        req.body = result.value
        next()

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            data: error.message
        })
    }
}


module.exports = { validateUser: validator(schema)}