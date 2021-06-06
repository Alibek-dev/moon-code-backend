const Parcel = require('../models/Parcel')
const TestResult = require('../models/TestResult')
const TestingService = require('../service/testing.service')
const fs = require('fs')
const TestService = require('../service/test.service')


class ParcelController {
    async testingCode(req, res) {
        try {

            const parcel = await Parcel.create({
                code: req.body.code,
                taskId: req.query.taskId,
                userId: req.user.id,
                status: "NULL"
            })

            fs.writeFileSync("files/code.txt", req.body.code)
            let code = fs.readFileSync("files/code.txt", "utf8")

            let tests = await TestService.getAllTestsByTaskId(req.query.taskId)

            await Parcel.update({status: "TESTING"},{where: {id: parcel.getDataValue('id')}})

            for (let test of tests) {
                const result = await TestingService.startTesting(code, test.dataValues)
                const testResult = await TestResult.create({
                    parcelId: parcel.id,
                    isPassed: result.isPassed,
                    errorMessage: result.errorMessage
                })
                test.dataValues.isPassed = testResult.getDataValue('isPassed')
                test.dataValues.errorMessage = testResult.getDataValue('errorMessage')
            }

            await Parcel.update({status: "DONE"},{where: {id: parcel.getDataValue('id')}})

            return res.status(200).json(tests)
        } catch (e) {
            console.log(e)
            return res.status(400)
        }
    }

    getAllParcels(req, res) {

    }
}

module.exports = new ParcelController
