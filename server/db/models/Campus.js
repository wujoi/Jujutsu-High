const Sequelize = require('sequelize')
const db = require('../db')

const Campus = db.define('campus', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: '/images/campus/default.png',
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

module.exports = Campus