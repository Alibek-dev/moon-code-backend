const db = require('../modules/connectionDB')
const DataTypes = require('sequelize')
const TestResult = require('./TestResult')

const Parcel = db.define('parcel', {
    code: {type: DataTypes.TEXT, required: true},

    /**
     * NULL - ничего
     * TESTING - идёт тестирование
     * DONE - закончил проверять все тесты
     */
    status: {type: DataTypes.STRING},
})

Parcel.hasMany(TestResult, {
    onDelete: 'cascade'
})

module.exports = Parcel
