const Rating = require('../models/Rating')
const RatingEnum = require('../types/Enums')

class RatingService {
    async calculateRatingForTask(task) {
        let ratings = await this.getAllRatingsByTaskId(task.id)

        let positiveCount = 0
        let negativeCount = 0
        ratings.forEach(rating => {
            if (rating.dataValues.value === RatingEnum.POSITIVE) {
                positiveCount++
            } else {
                negativeCount--
            }
        })
        return { positiveCount, negativeCount, ratingNumber: positiveCount + negativeCount }
    }

    async getAllRatingsByTaskId(id) {
        return Rating.findAll({where: {taskId: id}})
    }
}

module.exports = new RatingService
