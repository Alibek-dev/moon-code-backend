const Test = require('../models/Test')
const Input = require('../models/Input')


class TestService {
    async getAllTestsByTaskId(taskId) {
        let tests = await Test.findAll({where: {taskId}})

        for (let test of tests) {
            const inputs = await this.findAndGetAllInputsByTestId(test.getDataValue("id"))
            await test.setDataValue('inputs', inputs)
        }
        return tests
    }

    async findAndGetAllInputsByTestId(testId) {
        console.log(testId)
        return await Input.findAll({where: {testId}})
    }

    async createTestWithOutputValueAndOutputType(data) {
        const { outputType, outputValue, taskId, userId } = data
        return await Test.create({
            outputType,
            outputValue,
            taskId,
            userId
        })
    }

    async updateTestById(id, data) {
        await Test.update({
            outputType: data.outputType,
            outputValue: data.outputValue,
        }, {where: { id }})

        let test = await this.findAndGetTestById(id)

        await test.setDataValue('inputs', await this.findAndGetAllInputsByTestId(id))
        for (let input of test.dataValues.inputs) {
            await Input.destroy({where: {id: input.id}})
        }

        let inputs = []
        for (let input of data.inputs) {
            const item = await Input.create({
                type: input.type,
                value: input.value,
                testId: id
            })
            inputs.push(item)
        }
        test.setDataValue('inputs', inputs)

        return test
    }

    async findAndGetTestById(id) {
        return await Test.findByPk(id)
    }

    async destroyTestById(id) {
        return await Test.destroy({where: {id}})
    }

    async createInput(data) {
        return await Input.create({type: data.type, value: data.value, testId: data.testId})
    }
}


module.exports = new TestService
