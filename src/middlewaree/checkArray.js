module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }


    try {
        if (!req.items) {
            return res.status(400).json({message: "Входные параметры не должны быть пустыми"})
        }
        next()
    } catch (err) {
        console.error(err)
        return res.status(403).json({message: "Ошибка при создании теста"})
    }

}
