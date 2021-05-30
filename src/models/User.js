const db = require('../modules/connectionDB')
const DataTypes = require('sequelize')
const Task = require('./Task')
const Test = require('./Test')
const Parcel = require('./Parcel')
const Rating = require('./Rating')

const User = db.define('user', {
    username: {type: DataTypes.STRING, unique: true, required: true},
    password: {type: DataTypes.STRING, required: true},
    firstName: DataTypes.STRING,
    secondName: DataTypes.STRING,
    patronymic: DataTypes.STRING,
})

User.hasMany(Task, {
    onDelete: 'cascade'
})
User.hasMany(Test, {
    onDelete: 'cascade'
})
User.hasMany(Parcel, {
    onDelete: 'cascade'
})
User.hasMany(Rating, {
    onDelete: 'cascade'
})

module.exports = User
