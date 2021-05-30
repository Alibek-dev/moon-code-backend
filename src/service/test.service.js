const Test = require('../models/Test')


class TestService {
    async getAllTestsByTaskId(taskId) {
        return await Test.findAll({where: {taskId: taskId}})
    }

    async createTestWithOutputValueAndOutputType(data) {
        return await Test.create({
            outputType: data.outputType,
            outputValue: data.outputValue
        })
    }

    async updateTestById(id, data) {
        return await Test.update({
            input: data.input,
            output: data.output,
        }, {where: { id }})
    }

    async findAndGetTestById(id) {
        return await Test.findByPk(id)
    }

    async destroyTestById(id) {
        return await Test.destroy({where: {id}})
    }
}


module.exports = new TestService
