const db = require('../modules/connectionDB')
const DataTypes = require('sequelize')

const TestResult = require('./TestResult')
const Input = require('./Input')

const Test = db.define('test', {
    outputType: {type: DataTypes.STRING, required: true},
    outputValue: {type: DataTypes.STRING, required: true}
})

Test.hasMany(Input, {
    onDelete: 'cascade'
})
Test.hasMany(TestResult, {
    onDelete: 'cascade'
})

module.exports = Test
