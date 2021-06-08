const Task = require('../models/Task')
const Parcel = require('../models/Parcel')
const RatingEnum = require('../types/RatingEnum')
const RatingService = require('../service/rating.service')

const FavoriteService = require('../service/favorite.service')


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
            const {favorites} = req.query
            if (favorites === "true") {
                const favorites = await FavoriteService.findAllFavoriteTasks(req.user.id)
                let tasks = []
                for (let favorite of favorites) {
                    let task = await Task.findByPk(favorite.dataValues.taskId)
                    task.setDataValue('rating', await RatingService.calculateRatingForTask(task, req.user.id))

                    await FavoriteService.findOneFavoriteTask(task.dataValues.id, req.user.id) ?
                        task.setDataValue('inBookmark', true) :
                        task.setDataValue('inBookmark', false)

                    tasks.push(task)
                }

                return res.status(200).json({tasks})
            }

            let tasks = await Task.findAll()
            for (let task of tasks) {
                task.setDataValue('rating', await RatingService.calculateRatingForTask(task, req.user.id))

                await FavoriteService.findOneFavoriteTask(task.dataValues.id, req.user.id) ?
                    task.setDataValue('inBookmark', true) :
                    task.setDataValue('inBookmark', false)

            }
            return res.status(200).json({tasks})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: "Произошла ошибка, обратитесь к Системному Администратору"})
        }
    }

    async getAllTasksWithParcels(req, res) {
        try {
            let parcels = await Parcel.findAll({where: {userId: req.user.id}})
            let tasks = []
            let tasksKeys = new Set()

            for (let parcel of parcels) {
                const task = await Task.findByPk(parcel.getDataValue('taskId'))
                if (!tasksKeys.has(task.getDataValue('id'))) {
                    tasks.push(task)
                    tasksKeys.add(task.getDataValue('id'))
                }
            }

            for (let task of tasks) {
                task.setDataValue('rating', await RatingService.calculateRatingForTask(task, req.user.id))

                await FavoriteService.findOneFavoriteTask(task.dataValues.id, req.user.id) ?
                    task.setDataValue('inBookmark', true) :
                    task.setDataValue('inBookmark', false)

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
            task.setDataValue('rating', await RatingService.calculateRatingForTask(task, req.user.id))

            await FavoriteService.findOneFavoriteTask(task.dataValues.id, req.user.id) ?
                task.setDataValue('inBookmark', true) :
                task.setDataValue('inBookmark', false)


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
            const task = await Task.findByPk(taskId)

            let rating = await RatingService.findAndGetRatingByTaskIdAndUserId(taskId, req.user.id)
            if (!rating && (value === RatingEnum.POSITIVE || value === RatingEnum.NEGATIVE)) {
                await RatingService.createRating({
                    value,
                    taskId,
                    userId: req.user.id
                })
                return res.status(200).json({
                    message: "Рейтинг успешно поставлен",
                    rating: await RatingService.calculateRatingForTask(task, req.user.id)
                })
            }

            if (value === RatingEnum.POSITIVE || value === RatingEnum.NEGATIVE) {
                await RatingService.updateRatingByTaskIdAndUserId(taskId, req.user.id, {value})
                return res.status(200).json({
                    message: "Рейтинг изменен",
                    rating: await RatingService.calculateRatingForTask(task, req.user.id)
                })
            }

            if (value === RatingEnum.NOTHING) {
                await RatingService.destroyRatingByTaskIdAndUserId(taskId, req.user.id)
                return res.status(200).json({
                    message: "Голос снят",
                    rating: await RatingService.calculateRatingForTask(task, req.user.id)
                })
            }

            return res.status(400).json({message: "Указан не правильный value для рейтинга"})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: "Не удалось установить рейтинг"})
        }
    }



    async setFavorite(req, res) {
        try {
            const {inBookmark, taskId} = req.query
            const task = await Task.findByPk(taskId)
            if (!task) {
                return res.status(404).json({message: `Такая задача с id: ${req.query.id} не существует`})
            }

            const favoriteTask = await FavoriteService.findOneFavoriteTask(taskId, req.user.id)
            if (inBookmark.toUpperCase() === 'TRUE') {
                if (favoriteTask) {
                    return res.status(400).json({message: "Задача уже в закладках"})
                }

                await FavoriteService.createFavoriteTask(taskId, req.user.id)
                return res.status(200).json({message: "Задача успешно добавлена в закладки"})
            }
            if (inBookmark.toUpperCase() === 'FALSE') {
                if (favoriteTask) {
                    await FavoriteService.destroyFavoriteTask(taskId, req.user.id)
                    return res.status(200).json({message: "Задача успешно убрана из закладок"})
                } else {
                    return res.status(404).json({message: "Задачи нет в закладках"})
                }
            }


        } catch (e) {
            console.log(e)
            return res.status(400).json({message: "Не удалось добавить в добавить/убрать с закладок"})
        }
    }
}

module.exports = new TaskController
