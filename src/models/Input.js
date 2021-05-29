const db = require('../modules/connectionDB')
const DataTypes = require('sequelize')

const Input = db.define('input', {
    type: {type: DataTypes.STRING, required: true},
    value: {type: DataTypes.STRING, required: true}
})

module.exports = Input
