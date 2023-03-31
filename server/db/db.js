const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/acme_schools_db', {
  logging: false
})

module.exports = db