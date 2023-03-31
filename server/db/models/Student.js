const Sequelize = require('sequelize')
const db = require('../db')

const Student = db.define('student', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: '/images/students/default.png'
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    gpa: {
        type: Sequelize.DECIMAL(2,1),
        validate: {
            min: 0.0,
            max: 4.0
        },
    }
})

module.exports = Student