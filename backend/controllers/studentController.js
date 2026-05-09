const db = require('../db/connection');

exports.getAllStudents = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM student');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM student WHERE student_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Student not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createStudent = async (req, res) => {
  const { student_id, first_name, last_name, section_id } = req.body;
  try {
    await db.query(
      'INSERT INTO student (student_id, first_name, last_name, section_id) VALUES (?, ?, ?, ?)',
      [student_id, first_name, last_name, section_id]
    );
    res.status(201).json({ message: 'Student created successfully' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Student ID already exists' });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  const { first_name, last_name, section_id } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE student SET first_name = ?, last_name = ?, section_id = ? WHERE student_id = ?',
      [first_name, last_name, section_id, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Student updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM student WHERE student_id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};