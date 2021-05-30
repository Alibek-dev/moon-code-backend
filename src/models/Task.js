const db = require('../modules/connectionDB')
const DataTypes = require('sequelize')
const Test = require('./Test')
const Parcel = require('./Parcel')
const Rating = require('./Rating')

const Task = db.define('task', {
    title: {type: DataTypes.STRING, unique: true, required: true},
    text: {type: DataTypes.STRING, unique: true, required: true},
})

Task.hasMany(Test, {
    onDelete: 'cascade'
})
Task.hasMany(Parcel, {
    onDelete: 'cascade'
})
Task.hasMany(Rating, {
    onDelete: 'cascade'
})

module.exports = Task
