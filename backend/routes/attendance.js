const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { isAssignedTeacher } = require('../middleware/auth');

router.get('/:studentId', attendanceController.getAttendanceByStudent);
router.post('/', isAssignedTeacher, attendanceController.recordAttendance);

module.exports = router;