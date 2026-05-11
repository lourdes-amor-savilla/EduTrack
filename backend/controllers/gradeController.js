const db = require('../db/connection');

exports.getGradesByStudent = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM grades WHERE student_id = ?',
      [req.params.studentId]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'No grades found for this student' });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addGrade = async (req, res) => {
  const { student_id, subject_id, teacher_id, grading_period, grade } = req.body;
  try {
    // Check if teacher is assigned to this subject
    const [assignment] = await db.query(
      'SELECT * FROM class WHERE teacher_id = ? AND subject_id = ?',
      [teacher_id, subject_id]
    );
    if (assignment.length === 0) {
      return res.status(403).json({ error: 'You are not assigned to this subject' });
    }

    await db.query(
      'INSERT INTO grades (student_id, subject_id, teacher_id, grading_period, grade) VALUES (?, ?, ?, ?, ?)',
      [student_id, subject_id, teacher_id, grading_period, grade]
    );
    res.status(201).json({ message: 'Grade added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateGrade = async (req, res) => {
  const { teacher_id, subject_id, grade } = req.body;
  try {
    // Check if teacher is still assigned to this subject
    const [assignment] = await db.query(
      'SELECT * FROM class WHERE teacher_id = ? AND subject_id = ?',
      [teacher_id, subject_id]
    );
    if (assignment.length === 0) {
      return res.status(403).json({ error: 'You are not assigned to this subject' });
    }

    const [result] = await db.query(
      'UPDATE grades SET grade = ? WHERE grade_id = ?',
      [grade, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Grade record not found' });
    res.json({ message: 'Grade updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};