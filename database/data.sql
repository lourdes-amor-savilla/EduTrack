-- Main Teacher Table
INSERT INTO teacher (teacher_id, first_name, last_name, email, phone) VALUES
(112098, 'Antonio', 'Luna', 'a.luna@edutrack.ph', '0917-555-1234'),
(225041, 'Teresa', 'Magbanua', 't.magbanua@edutrack.ph', '0918-555-2345'),
(339182, 'Gregorio', 'del Pilar', 'g.delpilar@edutrack.ph', '0919-555-3456'),
(441029, 'Marcelo', 'del Pilar', 'm.delpilar@edutrack.ph', '0920-555-4567'),
(557382, 'Juan', 'Luna', 'j.luna@edutrack.ph', '0921-555-5678'),
(663910, 'Marina', 'Dizon', 'm.dizon@edutrack.ph', '0922-555-6789'),
-- Extra 2 for the 8-subject teacher requirement
(774821, 'Francisco', 'Balagtas', 'f.balagtas@edutrack.ph', '0923-555-7890'),
(882934, 'Leona', 'Florentino', 'l.florentino@edutrack.ph', '0924-555-8901');

-- Assigning all 8 to the Subject Teacher table
INSERT INTO subject_teacher (teacher_id) VALUES 
(112098), (225041), (339182), (441029), (557382), (663910), (774821), (882934);

-- Section Table

INSERT INTO section (section_id, section_name, grade_level) VALUES
(500119, 'Ipil-Ipil', 'Grade 7'),
(500210, 'Sampaguita', 'Grade 7'),
(500342, 'Narra', 'Grade 8'),
(500654, 'Kamagong', 'Grade 9'),
(500781, 'Molave', 'Grade 10'),
(500923, 'Acacia', 'Grade 10');

-- Advisor Table

INSERT INTO advisor (teacher_id, section_id) VALUES 
(112098, 500210), -- Antonio Luna advises Sampaguita
(225041, 500342), -- Teresa Magbanua advises Narra
(339182, 500781), -- Gregorio del Pilar advises Molave
(441029, 500119), -- Marcelo del Pilar advises Ipil-Ipil
(557382, 500654), -- Juan Luna advises Kamagong
(663910, 500923); -- Marina Dizon advises Acacia

-- Student Table
INSERT INTO student (student_id, first_name, middle_name, last_name, section_id) VALUES
-- Section 500210 (Sampaguita)
(881001, 'Juan', 'Ponce', 'Dela Cruz', 500210),
(881002, 'Maria', 'Clara', 'Santos', 500210),
(881003, 'Pedro', 'Bukaneg', 'Penduko', 500210),
(881004, 'Ana', 'Marie', 'Reyes', 500210),
(881005, 'Jose', 'Panganiban', 'Gomez', 500210),
(881006, 'Liza', 'Soberano', 'Manalo', 500210),
(881007, 'Ben', 'Hur', 'Dizon', 500210),
(881008, 'Clara', 'Eugenio', 'Bautista', 500210),
(881009, 'David', 'Asher', 'Lim', 500210),
(881010, 'Elena', 'Guerrero', 'Cruz', 500210),

-- Section 500342 (Narra)
(882001, 'Fernando', 'Kelly', 'Poe', 500342),
(882002, 'Gloria', 'Macaraig', 'Macapagal', 500342),
(882003, 'Herbert', 'Constantino', 'Bautista', 500342),
(882004, 'Isko', 'Domagoso', 'Moreno', 500342),
(882005, 'Joseph', 'Ejercito', 'Estrada', 500342),
(882006, 'Kris', 'Bernadette', 'Aquino', 500342),
(882007, 'Leni', 'Gerona', 'Robredo', 500342),
(882008, 'Manny', 'Dapidran', 'Pacquiao', 500342),
(882009, 'Nora', 'Cabaltera', 'Aunor', 500342),
(882010, 'Ogie', 'Hellard', 'Alcasid', 500342),

-- Section 500781 (Molave)
(883001, 'Paolo', 'Ballesteros', 'Contis', 500781),
(883002, 'Queenie', 'Gonzalez', 'Padilla', 500781),
(883003, 'Robin', 'Cariño', 'Padilla', 500781),
(883004, 'Sharon', 'Gamboa', 'Cuneta', 500781),
(883005, 'Tito', 'Castelo', 'Sotto', 500781),
(883006, 'Ursula', 'Besa', 'Lucero', 500781),
(883007, 'Vilma', 'Tuazon', 'Santos', 500781),
(883008, 'Wally', 'Ortiz', 'Bayola', 500781),
(883009, 'Xian', 'Phil', 'Lim', 500781),
(883010, 'Yassi', 'Isabelle', 'Pressman', 500781),

-- Section 500119 (Ipil-Ipil)
(884001, 'Zaijian', 'Godinez', 'Jaranilla', 500119),
(884002, 'Aiai', 'Quinto', 'Delas Alas', 500119),
(884003, 'Bong', 'Magsaysay', 'Revilla', 500119),
(884004, 'Coco', 'Nacianceno', 'Martin', 500119),
(884005, 'Dingdong', 'Gonzales', 'Dantes', 500119),
(884006, 'Eula', 'Amorsolo', 'Valdez', 500119),
(884007, 'Fely', 'Sarmiento', 'Pantaleon', 500119),
(884008, 'Gary', 'Bauermann', 'Valenciano', 500119),
(884009, 'Heart', 'Ongpauco', 'Evangelista', 500119),
(884010, 'Ian', 'De Leon', 'Veneracion', 500119),

-- Section 500654 (Kamagong)
(885001, 'Judy Ann', 'Lumagui', 'Santos', 500654),
(885002, 'Kim', 'Aladit', 'Chiu', 500654),
(885003, 'Lea', 'Imutan', 'Salonga', 500654),
(885004, 'Marian', 'Gracia', 'Rivera', 500654),
(885005, 'Nadine', 'Alexis', 'Lustre', 500654),
(885006, 'Piolo', 'Jose', 'Pascual', 500654),
(885007, 'Regine', 'Alcasid', 'Velasquez', 500654),
(885008, 'Sam', 'Lloyd', 'Milby', 500654),
(885009, 'Toni', 'Celestine', 'Gonzaga', 500654),
(885010, 'Vice', 'Viceral', 'Ganda', 500654),

-- Section 500923 (Acacia)
(886001, 'Alden', 'Faulkerson', 'Richards', 500923),
(886002, 'Maine', 'Capili', 'Mendoza', 500923),
(886003, 'Kathryn', 'Chandria', 'Bernardo', 500923),
(886004, 'Daniel', 'Ford', 'Padilla', 500923),
(886005, 'Enrique', 'Mari', 'Gil', 500923),
(886006, 'James', 'Robert', 'Reid', 500923),
(886007, 'Joshua', 'Espenilla', 'Garcia', 500923),
(886008, 'Julia', 'Francesca', 'Barretto', 500923),
(886009, 'Anne', 'Ojales', 'Curtis', 500923),
(886010, 'Vhong', 'Navarro', 'Navarro', 500923);


-- Subject Table

INSERT INTO subject (subject_id, subject_name) VALUES
(200101, 'Oral Communication'),
(200102, 'General Mathematics'),
(200103, 'Earth and Life Science'),
(200104, 'Komunikasyon at Pananaliksik'),
(200105, 'Physical Education and Health'),
(200106, 'Empowerment Technologies'),
(200107, '21st Century Literature'),
(200108, 'Understanding Culture, Society and Politics');


-- Class Table

INSERT INTO class (assignment_id, subject_id, teacher_id, section_id) VALUES
(1001, 200101, 112098, 500119), -- Antonio Luna teaches Oral Comm to Ipil-Ipil
(1002, 200102, 225041, 500119), -- Teresa Magbanua teaches Gen Math to Ipil-Ipil
(1003, 200103, 339182, 500119), -- Gregorio del Pilar teaches Earth and Life Science to Ipil-Ipil
(1004, 200104, 441029, 500119), -- Marco Del Pilar teaches Komunikasyon at Pananaliksik to Ipil-Ipil
(1005, 200105, 557382, 500119), -- Juan Luna teaches PE and Health to Ipil-Ipil
(1006, 200106, 663910, 500119), -- Marina Dizon teaches Empowerment Technologies to Ipil-Ipil
(1007, 200107, 774821, 500119), -- Francisco Balagtas teaches 21st Century Literature to  Ipil-Ipil
(1008, 200108, 882934, 500119), -- Leona Florentino teaches Understanding Culture, Society and Politics to Ipil-Ipil
(1009, 200101, 112098, 500210), -- Antonio Luna teaches Oral Comm to Sampaguita
(1010, 200102, 225041, 500210), -- Teresa Magbanua teaches Gen Math to Sampaguita
(1011, 200103, 339182, 500210), -- Gregorio del Pilar teaches Earth and Life Science to Sampaguita
(1012, 200104, 441029, 500210), -- Marco Del Pilar teaches Komunikasyon at Pananaliksik to Sampaguita
(1013, 200105, 557382, 500210), -- Juan Luna teaches PE and Health to Sampaguita
(1014, 200106, 663910, 500210), -- Marina Dizon teaches Empowerment Technologies to Sampaguita
(1015, 200107, 774821, 500210), -- Francisco Balagtas teaches 21st Century Literature to Sampaguita
(1016, 200108, 882934, 500210), -- Leona Florentino teaches Understanding Culture, Society and Politics to Sampaguita

(1017, 200102, 225041, 500342), -- Teresa Magbanua teachers Gen Math to Narra
(1025, 200105, 557382, 500654), -- Juan Luna teaches PE and Health to Kamagong
(1033, 200103, 339182, 500781), -- Gregorio Del Pilar teaches Earth and Life Science in Molave
(1041, 200106, 663910, 500923); -- Marino Dizon teaches EMpowerment Technologies to Acaccia





INSERT INTO attendance_record (attendance_id, date, status, student_id, assignment_id) VALUES
-- March 16 (Sampaguita)
(9001, '2026-03-16', 'Tardy', 881001, 1009),
(9002, '2026-03-16', 'Present', 881002, 1009), 
(9003, '2026-03-16', 'Present', 881003, 1009),
(9004, '2026-03-16', 'Present', 881004, 1009),
(9005, '2026-03-16', 'Present', 881005, 1009),
(9006, '2026-03-16', 'Absent', 881006, 1009),
(9007, '2026-03-16', 'Absent', 881007, 1009),
(9008, '2026-03-16', 'Present', 881008, 1009),
(9009, '2026-03-16', 'Present', 881009, 1009),
(9010, '2026-03-16', 'Tardy',   881010, 1009),

-- March 17

(9011, '2026-03-17', 'Tardy', 881001, 1009),
(9012, '2026-03-17', 'Present', 881002, 1009),
(9013, '2026-03-17', 'Present', 881003, 1009),
(9014, '2026-03-17', 'Present', 881004, 1009),
(9015, '2026-03-17', 'Present', 881005, 1009),
(9016, '2026-03-17', 'Absent', 881006, 1009),
(9017, '2026-03-17', 'Absent', 881007, 1009),
(9018, '2026-03-17', 'Present', 881008, 1009),
(9019, '2026-03-17', 'Present', 881009, 1009),
(9020, '2026-03-17', 'Present', 881010, 1009),

-- March 18

(9021, '2026-03-18', 'Present', 881001, 1009),
(9022, '2026-03-18', 'Present', 881002, 1009),
(9023, '2026-03-18', 'Present', 881003, 1009),
(9024, '2026-03-18', 'Present', 881004, 1009),
(9025, '2026-03-18', 'Present', 881005, 1009),
(9026, '2026-03-18', 'Absent', 881006, 1009),
(9027, '2026-03-18', 'Absent', 881007, 1009),
(9028, '2026-03-18', 'Present', 881008, 1009),
(9029, '2026-03-18', 'Present', 881009, 1009),
(9030, '2026-03-18', 'Present', 881010, 1009),

-- March 19

(131, '2026-03-19', 'Present', 881001, 1009),
(132, '2026-03-19', 'Present', 881002, 1009),
(133, '2026-03-19', 'Present', 881003, 1009),
(134, '2026-03-19', 'Present', 881004, 1009),
(135, '2026-03-19', 'Present', 881005, 1009),
(136, '2026-03-19', 'Absent', 881006, 1009),
(137, '2026-03-19', 'Absent', 881007, 1009), 
(138, '2026-03-19', 'Present', 881008, 1009), 
(139, '2026-03-19', 'Present', 881009, 1009), 
(140, '2026-03-19', 'Present', 881010, 1009),

-- March 20

(141, '2026-03-20', 'Present', 881001, 1009), 
(142, '2026-03-20', 'Present', 881002, 1009), 
(143, '2026-03-20', 'Present', 881003, 1009), 
(144, '2026-03-20', 'Present', 881004, 1009), 
(145, '2026-03-20', 'Present', 881005, 1009), 
(146, '2026-03-20', 'Absent', 881006, 1009), 
(147, '2026-03-20', 'Absent', 881007, 1009), 
(148, '2026-03-20', 'Present', 881008, 1009), 
(149, '2026-03-20', 'Present', 881009, 1009), 
(150, '2026-03-20', 'Present', 881010, 1009);

-- March 13 (Ipil-Ipil)
(301, '2026-03-13', 'Absent', 884001, 1001), 
(302, '2026-03-13', 'Absent', 884002, 1001), 
(303, '2026-03-13', 'Tardy', 884003, 1001), 
(304, '2026-03-13', 'Present', 884004, 1001), 
(305, '2026-03-13', 'Present', 884005, 1001), 
(306, '2026-03-13', 'Present', 884006, 1001), 
(307, '2026-03-13', 'Present', 884007, 1001), 
(308, '2026-03-13', 'Present', 884008, 1001), 
(309, '2026-03-13', 'Present', 884009, 1001), 
(310, '2026-03-13', 'Present', 884010, 1001),

-- Monday, March 16
(311, '2026-03-16', 'Absent', 884001, 1001), 
(312, '2026-03-16', 'Absent', 884002, 1001), 
(313, '2026-03-16', 'Tardy', 884003, 1001), 
(314, '2026-03-16', 'Present', 884004, 1001), 
(315, '2026-03-16', 'Present', 884005, 1001), 
(316, '2026-03-16', 'Present', 884006, 1001), 
(317, '2026-03-16', 'Present', 884007, 1001), 
(318, '2026-03-16', 'Present', 884008, 1001), 
(319, '2026-03-16', 'Present', 884009, 1001), 
(320, '2026-03-16', 'Present', 884010, 1001),

-- Tuesday, March 17
(321, '2026-03-17', 'Absent', 884001, 1001), 
(322, '2026-03-17', 'Absent', 884002, 1001), 
(323, '2026-03-17', 'Tardy', 884003, 1001), 
(324, '2026-03-17', 'Present', 884004, 1001), 
(325, '2026-03-17', 'Present', 884005, 1001), 
(326, '2026-03-17', 'Present', 884006, 1001), 
(327, '2026-03-17', 'Present', 884007, 1001), 
(328, '2026-03-17', 'Present', 884008, 1001), 
(329, '2026-03-17', 'Present', 884009, 1001), 
(330, '2026-03-17', 'Present', 884010, 1001),

-- Wednesday, March 18
(331, '2026-03-18', 'Absent', 884001, 1001), 
(332, '2026-03-18', 'Absent', 884002, 1001), 
(333, '2026-03-18', 'Tardy', 884003, 1001), 
(334, '2026-03-18', 'Present', 884004, 1001), 
(335, '2026-03-18', 'Present', 884005, 1001), 
(336, '2026-03-18', 'Present', 884006, 1001), 
(337, '2026-03-18', 'Present', 884007, 1001), 
(338, '2026-03-18', 'Present', 884008, 1001), 
(339, '2026-03-18', 'Present', 884009, 1001), 
(340, '2026-03-18', 'Present', 884010, 1001),

-- Thursday, March 19
(341, '2026-03-19', 'Absent', 884001, 1001),
(342, '2026-03-19', 'Absent', 884002, 1001), 
(343, '2026-03-19', 'Tardy', 884003, 1001), 
(344, '2026-03-19', 'Present', 884004, 1001), 
(345, '2026-03-19', 'Present', 884005, 1001), 
(346, '2026-03-19', 'Present', 884006, 1001), 
(347, '2026-03-19', 'Present', 884007, 1001), 
(348, '2026-03-19', 'Present', 884008, 1001), 
(349, '2026-03-19', 'Present', 884009, 1001), 
(350, '2026-03-19', 'Present', 884010, 1001),

-- Friday, March 20
(351, '2026-03-20', 'Present', 884001, 1001), 
(352, '2026-03-20', 'Present', 884002, 1001), 
(353, '2026-03-20', 'Tardy', 884003, 1001), 
(354, '2026-03-20', 'Present', 884004, 1001), 
(355, '2026-03-20', 'Present', 884005, 1001), 
(356, '2026-03-20', 'Present', 884006, 1001), 
(357, '2026-03-20', 'Present', 884007, 1001), 
(358, '2026-03-20', 'Present', 884008, 1001), 
(359, '2026-03-20', 'Present', 884009, 1001), 
(360, '2026-03-20', 'Present', 884010, 1001);





INSERT INTO attendance_record (attendance_id, date, status, student_id, assignment_id) VALUES
(401, '2026-03-16', 'Absent', 882001, 1017), 
(402, '2026-03-16', 'Tardy', 882002, 1017), 
(403, '2026-03-16', 'Absent', 882003, 1017), 
(404, '2026-03-16', 'Present', 882004, 1017), 
(405, '2026-03-16', 'Present', 882005, 1017), 
(406, '2026-03-16', 'Present', 882006, 1017), 
(407, '2026-03-16', 'Present', 882007, 1017), 
(408, '2026-03-16', 'Present', 882008, 1017), 
(409, '2026-03-16', 'Present', 882009, 1017), 
(410, '2026-03-16', 'Present', 882010, 1017),
(411, '2026-03-17', 'Absent', 882001, 1017), 
(412, '2026-03-17', 'Tardy', 882002, 1017), 
(413, '2026-03-17', 'Absent', 882003, 1017), 
(414, '2026-03-17', 'Present', 882004, 1017), 
(415, '2026-03-17', 'Present', 882005, 1017), 
(416, '2026-03-17', 'Present', 882006, 1017), 
(417, '2026-03-17', 'Present', 882007, 1017), 
(418, '2026-03-17', 'Present', 882008, 1017), 
(419, '2026-03-17', 'Present', 882009, 1017), 
(420, '2026-03-17', 'Present', 882010, 1017),
(421, '2026-03-18', 'Absent', 882001, 1017), 
(422, '2026-03-18', 'Tardy', 882002, 1017),
(423, '2026-03-18', 'Absent', 882003, 1017),
(424, '2026-03-18', 'Present', 882004, 1017), 
(425, '2026-03-18', 'Present', 882005, 1017), 
(426, '2026-03-18', 'Present', 882006, 1017), 
(427, '2026-03-18', 'Present', 882007, 1017), 
(428, '2026-03-18', 'Present', 882008, 1017), 
(429, '2026-03-18', 'Present', 882009, 1017), 
(430, '2026-03-18', 'Present', 882010, 1017),
(431, '2026-03-19', 'Absent', 882001, 1017), 
(432, '2026-03-19', 'Tardy', 882002, 1017), 
(433, '2026-03-19', 'Absent', 882003, 1017), 
(434, '2026-03-19', 'Present', 882004, 1017), 
(435, '2026-03-19', 'Present', 882005, 1017), 
(436, '2026-03-19', 'Present', 882006, 1017), 
(437, '2026-03-19', 'Present', 882007, 1017), 
(438, '2026-03-19', 'Present', 882008, 1017), 
(439, '2026-03-19', 'Present', 882009, 1017), 
(440, '2026-03-19', 'Present', 882010, 1017),
(441, '2026-03-20', 'Absent', 882001, 1017), 
(442, '2026-03-20', 'Tardy', 882002, 1017), 
(443, '2026-03-20', 'Absent', 882003, 1017), 
(444, '2026-03-20', 'Tardy', 882002, 1017), 
(445, '2026-03-20', 'Present', 882005, 1017), 
(446, '2026-03-20', 'Present', 882006, 1017), 
(447, '2026-03-20', 'Present', 882007, 1017), 
(448, '2026-03-20', 'Present', 882008, 1017), 
(449, '2026-03-20', 'Present', 882009, 1017), 
(450, '2026-03-20', 'Present', 882010, 1017),
(451, '2026-03-20', 'Tardy', 882002, 1017), 
(452, '2026-03-20', 'Tardy', 882002, 1017), 
(453, '2026-03-20', 'Tardy', 882002, 1017), 
(454, '2026-03-20', 'Tardy', 882002, 1017), 
(455, '2026-03-20', 'Tardy', 882002, 1017);


INSERT INTO attendance_record (attendance_id, date, status, student_id, assignment_id) VALUES
(601, '2026-03-16', 'Absent', 885001, 1025), 
(602, '2026-03-16', 'Tardy', 885002, 1025), 
(603, '2026-03-16', 'Absent', 885003, 1025), 
(604, '2026-03-16', 'Present', 885004, 1025), 
(605, '2026-03-16', 'Present', 885005, 1025), 
(606, '2026-03-16', 'Present', 885006, 1025), 
(607, '2026-03-16', 'Present', 885007, 1025), 
(608, '2026-03-16', 'Present', 885008, 1025), 
(609, '2026-03-16', 'Present', 885009, 1025), 
(610, '2026-03-16', 'Present', 885010, 1025),
(611, '2026-03-17', 'Absent', 885001, 1025), 
(612, '2026-03-17', 'Tardy', 885002, 1025), 
(613, '2026-03-17', 'Absent', 885003, 1025), 
(614, '2026-03-17', 'Present', 885004, 1025), 
(615, '2026-03-17', 'Present', 885005, 1025), 
(616, '2026-03-17', 'Present', 885006, 1025), 
(617, '2026-03-17', 'Present', 885007, 1025), 
(618, '2026-03-17', 'Present', 885008, 1025), 
(619, '2026-03-17', 'Present', 885009, 1025), 
(620, '2026-03-17', 'Present', 885010, 1025),
(621, '2026-03-18', 'Absent', 885001, 1025),
(622, '2026-03-18', 'Tardy', 885002, 1025), 
(623, '2026-03-18', 'Absent', 885003, 1025), 
(624, '2026-03-18', 'Present', 885004, 1025), 
(625, '2026-03-18', 'Present', 885005, 1025), 
(626, '2026-03-18', 'Present', 885006, 1025), 
(627, '2026-03-18', 'Present', 885007, 1025), 
(628, '2026-03-18', 'Present', 885008, 1025), 
(629, '2026-03-18', 'Present', 885009, 1025), 
(630, '2026-03-18', 'Present', 885010, 1025),
(631, '2026-03-19', 'Absent', 885001, 1025), 
(632, '2026-03-19', 'Tardy', 885002, 1025), 
(633, '2026-03-19', 'Absent', 885003, 1025), 
(634, '2026-03-19', 'Present', 885004, 1025), 
(635, '2026-03-19', 'Present', 885005, 1025), 
(636, '2026-03-19', 'Present', 885006, 1025), 
(637, '2026-03-19', 'Present', 885007, 1025), 
(638, '2026-03-19', 'Present', 885008, 1025), 
(639, '2026-03-19', 'Present', 885009, 1025), 
(640, '2026-03-19', 'Present', 885010, 1025),
(641, '2026-03-20', 'Absent', 885001, 1025), 
(642, '2026-03-20', 'Tardy', 885002, 1025), 
(643, '2026-03-20', 'Absent', 885003, 1025), 
(644, '2026-03-20', 'Present', 885004, 1025), 
(645, '2026-03-20', 'Present', 885005, 1025), 
(646, '2026-03-20', 'Present', 885006, 1025), 
(647, '2026-03-20', 'Present', 885007, 1025), 
(648, '2026-03-20', 'Present', 885008, 1025), 
(649, '2026-03-20', 'Present', 885009, 1025), 
(650, '2026-03-20', 'Present', 885010, 1025),
(651, '2026-03-16', 'Tardy', 885002, 1025), 
(652, '2026-03-17', 'Tardy', 885002, 1025), 
(653, '2026-03-18', 'Tardy', 885002, 1025), 
(654, '2026-03-19', 'Tardy', 885002, 1025), 
(655, '2026-03-20', 'Tardy', 885002, 1025);