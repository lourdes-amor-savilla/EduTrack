const db = require('../db/connection');

exports.getAttendanceByStudent = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM attendance_record WHERE student_id = ?',
      [req.params.studentId]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'No attendance_record records found for this student' });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.recordAttendance = async (req, res) => {
  const { student_id, subject_id, teacher_id, date, status } = req.body;
  try {
    // Check if teacher is assigned to this subject
    const [assignment] = await db.query(
      'SELECT * FROM class WHERE teacher_id = ? AND subject_id = ?',
      [teacher_id, subject_id]
    );
    if (assignment.length === 0) {
      return res.status(403).json({ error: 'You are not assigned to this subject' });
    }

    // Insert the attendance_record
    await db.query(
      'INSERT INTO attendance_record (student_id, subject_id, teacher_id, date, status) VALUES (?, ?, ?, ?, ?)',
      [student_id, subject_id, teacher_id, date, status]
    );

    // Count tardies for this student in this subject
    const [tardies] = await db.query(
      'SELECT COUNT(*) AS tardy_count FROM attendance_record WHERE student_id = ? AND subject_id = ? AND status = "Tardy"',
      [student_id, subject_id]
    );

    // Every 2 tardies = 1 absence, check total absences
    const tardy_count = tardies[0].tardy_count;
    const tardy_absences = Math.floor(tardy_count / 2);

    const [absences] = await db.query(
      'SELECT COUNT(*) AS absence_count FROM attendance_record WHERE student_id = ? AND subject_id = ? AND status = "Absent"',
      [student_id, subject_id]
    );

    const total_absences = absences[0].absence_count + tardy_absences;

    // Flag student as at risk if total absences >= 5
    if (total_absences >= 5) {
      await db.query(
        'UPDATE student SET at_risk = 1 WHERE student_id = ?',
        [student_id]
      );
      return res.status(201).json({
        message: 'Attendance recorded',
        warning: `Student has ${total_absences} absences and is flagged as AT RISK`
      });
    }

    res.status(201).json({ message: 'Attendance recorded successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};