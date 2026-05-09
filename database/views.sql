CREATE VIEW view_at_risk_subject_report AS
SELECT 
    CONCAT(s.first_name, ' ', s.last_name) AS Student_Name,
    sec.section_name AS Section,
    sub.subject_name AS Subject,
    CONCAT(t.first_name, ' ', t.last_name) AS Subject_Teacher,
    (COUNT(CASE WHEN ar.status = 'Absent' THEN 1 END) + 
     FLOOR(COUNT(CASE WHEN ar.status = 'Tardy' THEN 1 END) / 2)) AS Total_Absences
FROM section sec
JOIN student s ON sec.section_id = s.section_id
JOIN attendance_record ar ON s.student_id = ar.student_id
JOIN class c ON ar.assignment_id = c.assignment_id
JOIN subject sub ON c.subject_id = sub.subject_id
JOIN subject_teacher ON c.teacher_id = subject_teacher.teacher_id
JOIN teacher t ON subject_teacher.teacher_id = t.teacher_id
GROUP BY s.student_id, sub.subject_id
HAVING total_absences >= 5;

CREATE VIEW ACADEMIC_EXCELLENCE_CANDIDATES AS
SELECT 
    student.student_id,
    CONCAT(student.first_name,' ',student.last_name) AS Student_Name,
    CONCAT(teacher.first_name,' ',teacher.last_name) AS Advisor,
    AVG(grades.numerical_grade) AS GWA
FROM teacher
JOIN advisor ON teacher.teacher_id=advisor.teacher_id
JOIN student ON student.section_id = advisor.section_id
JOIN grades ON grades.student_id = student.student_id
GROUP BY student.student_id
HAVING AVG(numerical_grade) >= 90 
AND student_id NOT IN (SELECT student_id FROM GRADES WHERE status = 'Failed');

CREATE VIEW Teacher_Assignment AS
SELECT 
    CONCAT(t.first_name, ' ', t.last_name) AS Teacher_Name,
    sub.subject_name AS Subject,
    sec.section_name AS Section,
    sec.grade_level AS Grade_Level
FROM teacher t
JOIN class c ON t.teacher_id = c.teacher_id
JOIN subject sub ON c.subject_id = sub.subject_id
JOIN section sec ON c.section_id = sec.section_id
ORDER BY Teacher_Name ASC;

CREATE VIEW SECTION_SUMMARY_REPORT AS
SELECT 
    sec.section_id AS Section_ID,
    sec.section_name AS Section,
    sec.grade_level AS Grade_Level,
    CONCAT(t.first_name, ' ', t.last_name) AS Adviser_Name,
    (SELECT COUNT(*) FROM student WHERE section_id = sec.section_id) AS Total_Students
FROM section sec
LEFT JOIN advisor adv ON sec.section_id = adv.section_id
LEFT JOIN teacher t ON adv.teacher_id = t.teacher_id;
