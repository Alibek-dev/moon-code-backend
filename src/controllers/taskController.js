const Task = require('../models/Task')
const Rating = require('../models/Rating')
const RatingEnum = require('../types/Enums')
const RatingService = require('../service/rating.service')


class TaskController {
    async createTask(req, res) {
        try {
            const {title, text} = req.body
            const candidate = await Task.findOne({where: {text}})
            if (candidate) return res.status(400).json({message: "Данная задача уже существует"})
            const task = await Task.create({title, text, userId: req.user.id})
            return res.json({message: "Задача успешно создана", task})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: "Ошибка при создании задачи"})
        }
    }

    async getAllTasks(req, res) {
        try {
            let tasks = await Task.findAll()
            for (let task of tasks) {
                task.setDataValue('rating', await RatingService.calculateRatingForTask(task))
            }
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
            task.setDataValue('rating', await RatingService.calculateRatingForTask(task))
            return res.status(200).json(task)
        } catch (e) {
            console.log(e)
            return res.status(400)
        }
    }

    async updateTask(req, res) {
        try {
            let task = await Task.findByPk(req.query.id)
            if (!task) {
                return res.status(404).json({message: `Такая задача с id: ${req.query.id} не существует`})
            }

            const {title, text} = req.body
            const candidate = await Task.findOne({where: {title}})

            if (candidate && candidate.id.toString() !== req.query.id.toString()) {
                return res.status(400).json({message: "Данная задача уже существует"})
            }

            await Task.update({
                title,
                text,
            }, {where: {id: req.query.id}})

            task = await Task.findByPk(req.query.id)

            return res.status(200).json({message: "Задача успешно изменена", task})
        } catch (e) {
            console.log(e)
            return res.status(400)
        }
    }

    async deleteTask(req, res) {
        try {
            let task = await Task.findByPk(req.query.id)
            if (!task) {
                return res.status(404).json({message: `Такая задача с id: ${req.query.id} не существует`})
            }
            await Task.destroy({where: {id: req.query.id}})

            return res.status(200).json({message: "Задача успешно удалена"})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: "Ошибка при удалении задачи"})
        }
    }

    async setRaiting(req, res) {
        try {
            const {value, taskId} = req.query

            let rating = await Rating.findOne({where: {userId: req.user.id, taskId}})
            if (!rating) {
                rating = await Rating.create({value, taskId, userId: req.user.id})
                return res.status(200).json({message: "Рейтинг успешно поставлен", rating})
            }

            if (value !== RatingEnum.NOTHING) {
                await Rating.update({value}, {
                        where: {
                            taskId,
                            userId: req.user.id
                        }
                    }
                )
                return res.status(200).json({message: "Рейтинг изменен"})
            }

            if (req.body.value !== RatingEnum.NOTHING) {
                await Rating.destroy({
                    where: {
                        taskId,
                        userId: req.user.id
                    }
                })
                return res.status(200).json({message: "Голос снят"})
            }

            return res.status(400).json({message: "Что-то пошло не так"})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: "Не удалось установить рейтинг"})
        }
    }
}

module.exports = new TaskController
