const db = require('../modules/connectionDB')
const DataTypes = require('sequelize')
const Test = require('./Test')
const Parcel = require('./Parcel')

const Task = db.define('task', {
    tittle: {type: DataTypes.STRING, unique: true, required: true},
    text: {type: DataTypes.STRING, unique: true, required: true},
    inputDataText: {type: DataTypes.STRING, required: true},
    outputDataText: {type: DataTypes.STRING, required: true},
    rating: DataTypes.FLOAT(2, 2),
})

Task.hasMany(Test, {
    onDelete: 'cascade'
})
Task.hasMany(Parcel, {
    onDelete: 'cascade'
})

module.exports = Task
