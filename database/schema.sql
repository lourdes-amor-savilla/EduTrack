-- Create Database
CREATE DATABASE IF NOT EXISTS `edutrack`;
USE `edutrack`;

-- --------------------------------------------------------
-- 1. Table: teacher
-- --------------------------------------------------------
CREATE TABLE `teacher` (
  `teacher_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL UNIQUE,
  `phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`teacher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- 2. Table: section
-- --------------------------------------------------------
CREATE TABLE `section` (
  `section_id` int(11) NOT NULL,
  `section_name` varchar(50) NOT NULL,
  `grade_level` varchar(20) NOT NULL,
  PRIMARY KEY (`section_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- 3. Table: advisor (Sub-type of Teacher)
-- --------------------------------------------------------
CREATE TABLE `advisor` (
  `teacher_id` int(11) NOT NULL,
  `section_id` int(11) DEFAULT NULL UNIQUE,
  PRIMARY KEY (`teacher_id`),
  CONSTRAINT `fk_advisor_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_advisor_section` FOREIGN KEY (`section_id`) REFERENCES `section` (`section_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- 4. Table: subject_teacher (Sub-type of Teacher)
-- --------------------------------------------------------
CREATE TABLE `subject_teacher` (
  `teacher_id` int(11) NOT NULL,
  PRIMARY KEY (`teacher_id`),
  CONSTRAINT `fk_subject_teacher_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- 5. Table: subject
-- --------------------------------------------------------
CREATE TABLE `subject` (
  `subject_id` int(11) NOT NULL,
  `subject_name` varchar(100) NOT NULL,
  PRIMARY KEY (`subject_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- 6. Table: student
-- --------------------------------------------------------
CREATE TABLE `student` (
  `student_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) NOT NULL,
  `section_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  CONSTRAINT `fk_student_section` FOREIGN KEY (`section_id`) REFERENCES `section` (`section_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- 7. Table: class
-- --------------------------------------------------------
CREATE TABLE `class` (
  `assignment_id` int(11) NOT NULL,
  `subject_id` int(11) DEFAULT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `section_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`assignment_id`),
  CONSTRAINT `fk_class_subject` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_class_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `subject_teacher` (`teacher_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_class_section` FOREIGN KEY (`section_id`) REFERENCES `section` (`section_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- 8. Table: attendance_record
-- --------------------------------------------------------
CREATE TABLE `attendance_record` (
  `attendance_id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `status` varchar(10) NOT NULL CHECK (`status` IN ('Present','Absent','Tardy','Excused')),
  `student_id` int(11) NOT NULL,
  `assignment_id` int(11) NOT NULL,
  PRIMARY KEY (`attendance_id`),
  CONSTRAINT `fk_attendance_student` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_attendance_class` FOREIGN KEY (`assignment_id`) REFERENCES `class` (`assignment_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- 9. Table: grades (Updated per ERD with grade_id PK)
-- --------------------------------------------------------
CREATE TABLE `grades` (
  `grade_id` int(11) NOT NULL AUTO_INCREMENT,
  `grading_period` int(11) NOT NULL CHECK (`grading_period` BETWEEN 1 AND 4),
  `student_id` int(11) NOT NULL,
  `assignment_id` int(11) NOT NULL,
  `numerical_grade` decimal(5,2) NOT NULL CHECK (`numerical_grade` BETWEEN 0 AND 100),
  `status` varchar(10) DEFAULT NULL CHECK (`status` IN ('Passed','Failed','Incomplete')),
  PRIMARY KEY (`grade_id`),
  CONSTRAINT `fk_grades_student` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_grades_class` FOREIGN KEY (`assignment_id`) REFERENCES `class` (`assignment_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;