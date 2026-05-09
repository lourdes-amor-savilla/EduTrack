const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');
const { isAssignedTeacher } = require('../middleware/auth');

router.get('/:studentId', gradeController.getGradesByStudent);
router.post('/', isAssignedTeacher, gradeController.addGrade);
router.put('/:id', isAssignedTeacher, gradeController.updateGrade);

module.exports = router;