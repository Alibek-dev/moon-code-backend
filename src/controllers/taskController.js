const { validationResult } = require('express-validator')
const Task = require('../models/Task')

class TaskController {
    async createTask(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при создании задачи", errors})
            }
            const { text, inputDataText, outputDataText } = req.body
            const candidate = await Task.findOne({where: {text}})
            if (candidate) {
                return res.status(400).json({message: "Данная задача уже существует"})
            }
            const task = await Task.create({text, inputDataText, outputDataText, userId: req.user.id})
            return res.json({message: "Задача успешно создана", task})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Ошибка при создании задачи"})
        }
    }
}

module.exports = new TaskController
