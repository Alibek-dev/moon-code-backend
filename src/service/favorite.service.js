const FavoriteTask = require('../models/FavoriteTask')

class FavoriteService {
    async createFavoriteTask(taskId, userId) {
        return await FavoriteTask.create({taskId, userId})
    }

    async destroyFavoriteTask(taskId, userId) {
        return await FavoriteTask.destroy({where: {taskId, userId}})
    }

    async findOneFavoriteTask(taskId, userId) {
        return await FavoriteTask.findOne({where: {taskId, userId}})
    }

    async findAllFavoriteTasks(userId) {
        return await FavoriteTask.findAll({where: {userId}})
    }
}

module.exports = new FavoriteService
