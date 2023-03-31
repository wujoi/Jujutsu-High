const {db, Campus, Student} = require('../server/db')

const students = require('../src/students.json')

const campuses = require('../src/campuses.json');

const {green, red} = require('chalk')

const seed = async () => {
  try {
    await db.sync({force: true})

    await Promise.all(campuses.map(campus => {
      console.log(`Creating campus: ${campus.name}`);
      return Campus.create(campus);
    }));
    
    await Promise.all(students.map(student => {
      console.log(`Creating student: ${student.firstName}`);
      return Student.create(student);
    }));

    console.log(green('Seeding success!'))
    db.close()
  }
  catch (err) {
    console.error(red('Ooops! Something went wrong!'))
    console.error(err)
    db.close()
  }
}

seed().catch(err => {
  db.close()
  console.log(`

    Error seeding:

    ${err.message}

    ${err.stack}

  `)
})