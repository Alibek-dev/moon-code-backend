const db = require('../modules/connectionDB')
const DataTypes = require('sequelize')

const Input = require('./Input')

const Test = db.define('test', {
    outputType: {type: DataTypes.STRING, required: true},
    outputValue: {type: DataTypes.STRING, required: true}
})

Test.hasMany(Input, {
    onDelete: 'cascade'
})

module.exports = Test
