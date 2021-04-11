const db = require('../modules/connectionDB')
const DataTypes = require('sequelize')
const Test = require('./Test')

const Task = db.define('task', {
    text: {type: DataTypes.STRING, unique: true, required: true},
    rating: DataTypes.FLOAT(2, 2),
})

Task.hasMany(Test, {
    onDelete: 'cascade'
})

module.exports = Task
