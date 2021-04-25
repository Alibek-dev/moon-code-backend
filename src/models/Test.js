const db = require('../modules/connectionDB')
const DataTypes = require('sequelize')

const Test = db.define('test', {
    input: {type: DataTypes.STRING, required: true},
    output: {type: DataTypes.STRING, required: true},
    // userId: {type: DataTypes.NUMBER, required: true},
})

module.exports = Test
