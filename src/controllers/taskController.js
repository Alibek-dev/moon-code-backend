const { validationResult } = require('express-validator')
const Task = require('../models/Task')

class TaskController {
    async createTask(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Поля не валидны", errors})
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
            return res.status(400).json({message: "Ошибка при создании задачи"})
        }
    }
    async getAllTasks(req, res) {
        try {
            const tasks = await Task.findAll()
            return res.status(200).json({tasks})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: "Произошла ошибка, обратитесь к Системному Администратору"})
        }
    }
    async getTaskById(req, res) {
        try {
            const task = await Task.findByPk(req.query.id)
            if (!task) {
                return res.status(404).json({message: `Такая задача с id: ${req.query.id} не существует`})
            }
            return res.status(200).json(task)
        } catch (e) {
            console.log(e)
            return res.status(400)
        }
    }
    async updateTask(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Поля не валидны", errors})
            }

            let task = await Task.findByPk(req.query.id)
            if (!task) {
                return res.status(404).json({message: `Такая задача с id: ${req.query.id} не существует`})
            }

            const { text, inputDataText, outputDataText } = req.body
            const candidate = await Task.findOne({where: {text}})

            if (candidate && candidate.id.toString() !== req.query.id.toString()) {
                return res.status(400).json({message: "Данная задача уже существует"})
            }

            await Task.update({
                text: text,
                inputDataText: inputDataText,
                outputDataText: outputDataText
            }, {where: { id: req.query.id }})

            task = await Task.findByPk(req.query.id)

            return res.status(200).json({message: "Задача успешно изменена", task})
        } catch (e) {
            console.log(e)
            return res.status(400)
        }
    }
}

module.exports = new TaskController
