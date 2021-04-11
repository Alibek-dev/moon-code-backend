const db = require('../modules/connectionDB')
const DataTypes = require('sequelize')
const Task = require('./Task')

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

module.exports = User
