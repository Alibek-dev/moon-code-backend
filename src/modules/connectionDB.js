const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('moon_code', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
})

module.exports = sequelize
