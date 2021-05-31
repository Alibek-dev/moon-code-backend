const Rating = require('../models/Rating')
const RatingEnum = require('../types/Enums')

class RatingService {
    async calculateRatingForTask(task, userId) {
        let ratings = await this.getAllRatingsByTaskId(task.id)

        let positiveCount = 0
        let negativeCount = 0
        let userIsVoted = false
        let userVotedValue = null
        ratings.forEach(rating => {
            if (rating.dataValues.value === RatingEnum.POSITIVE) {
                positiveCount++
            } else {
                negativeCount--
            }
            if (rating.dataValues.userId === userId) {
                userIsVoted = true
                userVotedValue = rating.dataValues.value
            }
        })
        return {
            positiveCount,
            negativeCount,
            ratingNumber: positiveCount + negativeCount,
            userIsVoted,
            userVatedValue: userVotedValue
        }
    }

    async getAllRatingsByTaskId(id) {
        return Rating.findAll({where: {taskId: id}})
    }

    async findAndGetRatingByTaskIdAndUserId(taskId, userId) {
        return await Rating.findOne({where: {userId, taskId}})
    }

    async createRating(data) {
        const {value, taskId, userId} = data
        return await Rating.create({
            value,
            taskId,
            userId
        })
    }

    async destroyRatingByTaskIdAndUserId(taskId, userId) {
        return await Rating.destroy({
            where: {
                taskId,
                userId
            }
        })
    }

    async updateRatingByTaskIdAndUserId(taskId, userId, data) {
        return await Rating.update({value: data.value}, {
                where: {
                    taskId,
                    userId,
                }
            }
        )
    }
}

module.exports = new RatingService
