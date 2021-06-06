const db = require('../modules/connectionDB')
const DataTypes = require('sequelize')

const TestResult = db.define('testResult', {
    isPassed: {type: DataTypes.BOOLEAN},
    errorMessage: {type: DataTypes.TEXT},
})

module.exports = TestResult
