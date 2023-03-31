const router = require("express").Router()
const { Student, Campus }  = require('../db')

router.get('/', async (req, res, next) => {
    try {
        const students = await Student.findAll({
            where: req.query,
            include: [Campus],
        })
        res.json(students)
    } catch (error) { 
        next(error) 
    }
})

router.get('/:studentId', async (req, res, next) => {
    try {
        const student = await Student.findByPk(req.params.studentId, {
            include: [Campus],
        })
        res.json(student)
    } catch (error) {
        console.log(error);
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
      res.status(201).send(await Student.create(req.body));
    } catch (error) {
      console.log(error);
      next(error);
    }
});
  
router.put('/:studentId', async (req, res, next) => {
    try {
        const student = await Student.findByPk(req.params.studentId);
        console.log()
        const updated = await student.update(req.body);
        updated.save();
        res.json(updated);
    } catch (error) {
        console.log(error);
        next(error);
    }
});
  
router.delete('/:studentId', async (req, res, next) => {
    try {
        const student = await Student.findByPk(req.params.studentId);
        await student.destroy();
        res.send(student);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router