const Test = require('../models/Test')

class TestController {
    async createTest(req, res) {
        try {
            const { input, output } = req.body
            const candidate = await Test.findOne({where: {input}})
            if (candidate) return res.status(400).json({message: "Данный тест уже существует"})
            const test = await Test.create({input, output, taskId: Number(req.query.taskId), userId: req.user.id})
            return res.json({message: "Тест успешно создан", test})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: "Ошибка при создании теста"})
        }
    }
}

module.exports = new TestController
