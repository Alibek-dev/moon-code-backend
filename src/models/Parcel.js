const db = require('../modules/connectionDB')
const DataTypes = require('sequelize')

const Parsel = db.define('task', {
    code: {type: DataTypes.STRING, required: true},
    isPassedAllTests: {type: DataTypes.BOOLEAN, required: true},
    status: {type: DataTypes.STRING},
    taskId: {type: DataTypes.NUMBER, required: true},
    userId: {type: DataTypes.NUMBER, required: true},
})

module.exports = Parsel
