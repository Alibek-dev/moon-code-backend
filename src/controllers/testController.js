const Test = require('../models/Test')
const Input = require('../models/Input')
const Task = require('../models/Task')
const TestService = require('../service/test.service')

class TestController {
    async createTest(req, res) {
        try {
            const task = await Task.findByPk(req.query.taskId)
            if (!task) {
                return res.status(404).json({message: "Такая задача не найдена"})
            }
            const { inputs, outputType, outputValue } = req.body

            let test = await TestService.createTestWithOutputValueAndOutputType({outputType, outputValue})
            test.setDataValue('inputs', [])

            let input
            for (const item of inputs) {
                input = await Input.create({type: item.type, value: item.value})
                await test.dataValues.inputs.push(input)
            }

            return res.json({message: "Тесты успешно созданы", test})
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
            const tests = await TestService.getAllTestsByTaskId(req.query.taskId)
            return res.json(tests)
        } catch (e) {
            console.log(e)
            return res.status(400)
        }
    }
    async updateTest(req, res) {
        try {
            const { input, output } = req.body

            await TestService.updateTestById(req.query.testId, {input, output})

            return res.json({message: "Тест успешно изменен"})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: "Ошибка при создании теста"})
        }
    }
    async deleteTest(req, res) {
        try {
            let test = await TestService.findAndGetTestById(req.query.testId)
            if (!test) {
                return res.status(404).json({message: `Такой тест с id: ${req.query.testId} не существует`})
            }

            await TestService.destroyTestById(req.query.testId)
            return res.status(200).json({message: "Тест успешно удален"})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: "Не удалось удалить тест"})
        }
    }
}

module.exports = new TestController
