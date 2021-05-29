const db = require('../modules/connectionDB')
const DataTypes = require('sequelize')
const Test = require('./Test')
const Parcel = require('./Parcel')

const Task = db.define('task', {
    title: {type: DataTypes.STRING, unique: true, required: true},
    text: {type: DataTypes.STRING, unique: true, required: true},
    rating: DataTypes.FLOAT(2, 2),
})

Task.hasMany(Test, {
    onDelete: 'cascade'
})
Task.hasMany(Parcel, {
    onDelete: 'cascade'
})

module.exports = Task
