const db = require('./db')
const Campus = require('./models/Campus')
const Student = require('./models/Student')

Campus.hasMany(Student)
Student.belongsTo(Campus)

module.exports = {
    db, 
    Campus,
    Student,
}