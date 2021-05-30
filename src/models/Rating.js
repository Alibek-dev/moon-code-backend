const db = require('../modules/connectionDB')
const DataTypes = require('sequelize')

const Rating = db.define('rating', {
    value: {type: DataTypes.STRING, required: true},
})

module.exports = Rating
