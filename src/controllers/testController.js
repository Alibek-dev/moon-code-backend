const Test = require('../models/Test')
const Task = require('../models/Task')

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
    async getTestsByTaskId(req, res) {
        try {
            const task = await Task.findByPk(req.query.taskId)
            if (!task) {
                return res.status(404).json({message: "Такая задача не найдена"})
            }
            const tests = await Test.findAll({where: {taskId: req.query.taskId}})
            return res.json(tests)
        } catch (e) {
            console.log(e)
            return res.status(400)
        }
    }
}

module.exports = new TestController
