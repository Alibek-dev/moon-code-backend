const db = require('../modules/connectionDB')
const DataTypes = require('sequelize')

const User = db.define('user', {
    username: {type: DataTypes.STRING, unique: true, required: true},
    password: {type: DataTypes.STRING, required: true},
    firstName: DataTypes.STRING,
    secondName: DataTypes.STRING,
    patronymic: DataTypes.STRING,
})

module.exports = User
