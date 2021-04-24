const {validationResult} = require('express-validator')

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({message: "Поля не валидны", errors})
    }
    next()
}
