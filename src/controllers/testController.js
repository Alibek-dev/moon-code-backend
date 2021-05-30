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

            let test = await TestService.createTestWithOutputValueAndOutputType({
                outputType,
                outputValue,
                taskId: req.query.taskId,
                userId: req.user.id
            })

            let input
            let m = []
            for (const item of inputs) {
                input = await TestService.createInput({type: item.type, value: item.value, testId: test.getDataValue('id')})
                m.push(input)
            }
            await test.setDataValue('inputs', m)

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
            const { inputs, outputType, outputValue } = req.body

            await TestService.updateTestById(req.query.testId, {inputs, outputType, outputValue})

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
