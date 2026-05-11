const db = require('../db/connection');

// Students with 5+ absences (per subject)
exports.getAtRiskStudents = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM view_at_risk_subject_report WHERE Section = ?',
      [req.params.sectionName]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'No at-risk students found' });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Students with GWA >= 90 and no failing grade
exports.getAcademicExcellence = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM ACADEMIC_EXCELLENCE_CANDIDATES'
    );
    if (rows.length === 0) return res.status(404).json({ error: 'No candidates found' });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// All teacher assignments (subject + section)
exports.getTeacherAssignments = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM Teacher_Assignment'
    );
    if (rows.length === 0) return res.status(404).json({ error: 'No assignments found' });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Section summary (adviser, total students, grade level)
exports.getSectionSummary = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM SECTION_SUMMARY_REPORT WHERE Section_ID = ?',
      [req.params.sectionId]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Section not found' });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTeacherAssignmentsById = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT sub.subject_name AS Subject, sec.section_name AS Section, sec.grade_level AS Grade_Level
       FROM class c
       JOIN subject sub ON c.subject_id = sub.subject_id
       JOIN section sec ON c.section_id = sec.section_id
       WHERE c.teacher_id = ?`,
      [req.params.teacherId]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'No assignments found' });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};