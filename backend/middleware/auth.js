const db = require('../db/connection');

// Check if the teacher is an adviser (view-only for grades)
exports.isAdviser = async (req, res, next) => {
  const { teacher_id } = req.body;
  try {
    const [rows] = await db.query(
      'SELECT * FROM advisor WHERE teacher_id = ?',
      [teacher_id]
    );
    if (rows.length === 0) return res.status(403).json({ error: 'Access denied. Not an adviser.' });
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Check if the teacher is assigned to the subject before editing grades or attendance
exports.isAssignedTeacher = async (req, res, next) => {
  const { teacher_id, subject_id } = req.body;
  try {
    const [rows] = await db.query(
      'SELECT * FROM class WHERE teacher_id = ? AND subject_id = ?',
      [teacher_id, subject_id]
    );
    if (rows.length === 0) {
      return res.status(403).json({ error: 'Access denied. You are not assigned to this subject.' });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};