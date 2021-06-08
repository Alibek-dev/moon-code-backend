const Parcel = require('../models/Parcel')
const TestResult = require('../models/TestResult')
const TestingService = require('../service/testing.service')
const fs = require('fs')
const TestService = require('../service/test.service')


class ParcelController {
    async testingCode(req, res) {
        try {

            let parcel = await Parcel.create({
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
                    testId: test.dataValues.id,
                    isPassed: result.isPassed,
                    errorMessage: result.errorMessage
                })
                test.dataValues.isPassed = testResult.getDataValue('isPassed')
                test.dataValues.errorMessage = testResult.getDataValue('errorMessage')
            }

            await Parcel.update({status: "DONE"},{where: {id: parcel.getDataValue('id')}})

            parcel = await await Parcel.findByPk(parcel.getDataValue('id'))

            await parcel.setDataValue('tests', tests)

            return res.status(200).json(parcel)
        } catch (e) {
            console.log(e)
            return res.status(400)
        }
    }

    async getAllParcels(req, res) {
        try {
            let parcels = await Parcel.findAll({where: {taskId: req.query.taskId, userId: req.user.id}})
            for (let parcel of parcels) {
                const testResult = await TestResult.findByPk(parcel.dataValues.id)
                parcel.dataValues.isPassed = testResult.getDataValue('isPassed')
                parcel.dataValues.errorMessage = testResult.getDataValue('errorMessage')
            }
            return res.status(200).json(parcels)
        } catch (e) {
            return res.status(400).json()
            console.log(e)
        }
    }

    async getParcel(req, res) {
        try{
            let parcel = await Parcel.findByPk(req.query.parcelId)
            let tests = await TestService.getAllTestsByTaskId(req.query.taskId)
            for (let test of tests) {
                const testResult = await TestResult.findOne({where: {testId: test.dataValues.id, parcelId: parcel.getDataValue('id')}})
                test.dataValues.isPassed = testResult.getDataValue('isPassed')
                test.dataValues.errorMessage = testResult.getDataValue('errorMessage')
            }
            parcel.setDataValue("tests", tests)
            return res.status(200).json(parcel)
        } catch (e) {
            console.log(e)
            return res.status(404)
        }
    }
}

module.exports = new ParcelController
