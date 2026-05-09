const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/at-risk/:sectionName', reportController.getAtRiskStudents);
router.get('/academic-excellence', reportController.getAcademicExcellence);
router.get('/teacher-assignments', reportController.getTeacherAssignments);
router.get('/section-summary/:sectionId', reportController.getSectionSummary);

module.exports = router;