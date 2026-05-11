      // ═══════════════════════════════════════════════════
      //  CONFIG & STATE
      // ═══════════════════════════════════════════════════
      const API = "http://localhost:3000/api";

      let currentUser = null;
      let allStudents = [];
      let allGrades = [];

      // ═══════════════════════════════════════════════════
      //  INIT
      // ═══════════════════════════════════════════════════
      document.addEventListener("DOMContentLoaded", async () => {
        // Load user session
        const raw = sessionStorage.getItem("edutrack_user");
        if (!raw) {
          window.location.href = "login.html";
          return;
        }
        currentUser = JSON.parse(raw);

        // Populate UI with user info
        const initials =
          currentUser.initials ||
          currentUser.name
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
        document.getElementById("userAvatarBtn").textContent = initials;
        document.getElementById("headerAvatar")?.remove; // already set above
        document.getElementById("ddAvatar").textContent = initials;
        document.getElementById("ddName").textContent = currentUser.name;
        document.getElementById("ddRole").textContent = currentUser.role;
        document.getElementById("ddEmail").textContent = currentUser.email;
        document.getElementById("sidebarAvatar").textContent = initials;
        document.getElementById("sidebarName").textContent = currentUser.name;
        document.getElementById("sidebarRole").textContent = currentUser.role;

        // Greeting
        const hr = new Date().getHours();
        const greeting =
          hr < 12
            ? "Good morning"
            : hr < 18
              ? "Good afternoon"
              : "Good evening";
        document.getElementById("greetingText").textContent =
          `${greeting}, ${currentUser.name.split(" ").pop()} 👋`;

        // Set today's date default for attendance
        document.getElementById("ra-date").value = new Date()
          .toISOString()
          .split("T")[0];

        // Load everything
        await loadStudents();
        await loadDashboardStats();
        await loadAtRiskDashboard();
        await loadExcellenceDashboard();
        await loadAssignmentsDashboard();
      });

      // ═══════════════════════════════════════════════════
      //  NAVIGATION
      // ═══════════════════════════════════════════════════
      function showSection(id, el, label) {
        document
          .querySelectorAll(".section-view")
          .forEach((s) => s.classList.remove("active"));
        document
          .querySelectorAll(".nav-item")
          .forEach((n) => n.classList.remove("active"));
        document.getElementById("section-" + id).classList.add("active");
        el.classList.add("active");
        document.getElementById("activeSectionLabel").textContent = label;
      }

      // ═══════════════════════════════════════════════════
      //  API HELPERS
      // ═══════════════════════════════════════════════════
      async function apiFetch(path, opts = {}) {
        const res = await fetch(API + path, {
          headers: { "Content-Type": "application/json" },
          ...opts,
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
        return data;
      }

      // ═══════════════════════════════════════════════════
      //  STUDENTS
      // ═══════════════════════════════════════════════════
      async function loadStudents() {
        try {
          allStudents = await apiFetch("/students");
          renderStudentsTable(allStudents);
          populateStudentSelects(allStudents);
        } catch (e) {
          showToast("Failed to load students: " + e.message, "danger");
        }
      }

      function renderStudentsTable(students) {
        const tbody = document.getElementById("studentsTableBody");
        if (!students.length) {
          tbody.innerHTML =
            '<tr><td colspan="4" class="loading-row">No students found.</td></tr>';
          return;
        }
        tbody.innerHTML = students
          .map(
            (s) => `
    <tr>
      <td style="font-family:var(--font-mono);font-size:.78rem">${s.student_id}</td>
      <td class="fw-600">${s.last_name}, ${s.first_name}${s.middle_name ? " " + s.middle_name : ""}</td>
      <td>${s.section_id ? `Section ${s.section_id}` : '<span class="text-muted">—</span>'}</td>
      <td>
        <div style="display:flex;gap:6px;">
          <button class="btn btn-outline" style="padding:4px 10px;font-size:.72rem;" onclick="openStudentProfile(${s.student_id})">View</button>
          <button class="btn btn-outline" style="padding:4px 10px;font-size:.72rem;" onclick="openEditStudentModal(${s.student_id})">Edit</button>
          <button class="btn btn-danger" style="padding:4px 10px;font-size:.72rem;" onclick="deleteStudent(${s.student_id})">Delete</button>
        </div>
      </td>
    </tr>
  `,
          )
          .join("");
      }

      function filterStudents() {
        const q = document.getElementById("studentSearch").value.toLowerCase();
        const filtered = allStudents.filter(
          (s) =>
            s.first_name.toLowerCase().includes(q) ||
            s.last_name.toLowerCase().includes(q) ||
            String(s.student_id).includes(q),
        );
        renderStudentsTable(filtered);
      }

      function populateStudentSelects(students) {
        const studentSelects = [
          "ag-student",
          "ra-student",
          "gradesStudentFilter",
          "attStudentFilter",
        ];
        studentSelects.forEach((id) => {
          const el = document.getElementById(id);
          if (!el) return;
          const first = el.options[0];
          el.innerHTML = "";
          el.appendChild(first);
          students.forEach((s) => {
            const opt = document.createElement("option");
            opt.value = s.student_id;
            opt.textContent = `${s.last_name}, ${s.first_name} (ID: ${s.student_id})`;
            el.appendChild(opt);
          });
        });
      }

      async function openStudentProfile(studentId) {
        const s = allStudents.find((x) => x.student_id == studentId);
        if (!s) return;
        const fullName = `${s.first_name}${s.middle_name ? " " + s.middle_name : ""} ${s.last_name}`;
        const initials = (s.first_name[0] + s.last_name[0]).toUpperCase();
        document.getElementById("spm-initials").textContent = initials;
        document.getElementById("spm-name").textContent = fullName;
        document.getElementById("spm-id-info").textContent =
          `Student ID: ${s.student_id}`;
        document.getElementById("spm-fullname").textContent = fullName;
        document.getElementById("spm-section").textContent = s.section_id
          ? `Section ${s.section_id}`
          : "—";
        document.getElementById("spm-sid").textContent = s.student_id;

        openModal("studentProfileModal");

        // Load grades
        try {
          const grades = await apiFetch(`/grades/${studentId}`);
          const tbody = document.getElementById("spm-grades-body");
          tbody.innerHTML =
            grades
              .map(
                (g) => `
      <tr>
        <td>Assignment #${g.assignment_id}</td>
        <td>Q${g.grading_period}</td>
        <td><span class="grade-chip ${g.numerical_grade >= 75 ? (g.numerical_grade >= 90 ? "pass" : "warn") : "fail"}">${g.numerical_grade}</span></td>
        <td>${g.status || autoStatus(g.numerical_grade)}</td>
      </tr>
    `,
              )
              .join("") ||
            '<tr><td colspan="4" style="text-align:center;padding:16px;color:var(--gray-400)">No grade records</td></tr>';
        } catch (e) {
          document.getElementById("spm-grades-body").innerHTML =
            '<tr><td colspan="4" style="text-align:center;padding:16px;color:var(--gray-400)">No grade records found</td></tr>';
        }

        // Load attendance
        try {
          const att = await apiFetch(`/attendance/${studentId}`);
          const tbody = document.getElementById("spm-att-body");
          const colorMap = {
            Present: "good",
            Absent: "at-risk",
            Tardy: "warning",
            Excused: "",
          };
          tbody.innerHTML =
            att
              .map(
                (a) => `
      <tr>
        <td>${a.date ? new Date(a.date).toLocaleDateString("en-PH") : a.date}</td>
        <td>Assignment #${a.assignment_id}</td>
        <td><span class="status-pill ${colorMap[a.status] || ""}">${a.status}</span></td>
      </tr>
    `,
              )
              .join("") ||
            '<tr><td colspan="3" style="text-align:center;padding:16px;color:var(--gray-400)">No attendance records</td></tr>';
        } catch (e) {
          document.getElementById("spm-att-body").innerHTML =
            '<tr><td colspan="3" style="text-align:center;padding:16px;color:var(--gray-400)">No attendance records found</td></tr>';
        }
      }

      function openAddStudentModal() {
        ["as-id", "as-fname", "as-mname", "as-lname", "as-section"].forEach(
          (id) => (document.getElementById(id).value = ""),
        );
        hideError("as-error");
        openModal("addStudentModal");
      }

      async function populateSectionSelects() {
        // Try to load sections from reports/section-summary or just use static for now
        // Since backend doesn't have a /sections endpoint, populate from student data
        const sectionIds = [
          ...new Set(allStudents.map((s) => s.section_id).filter(Boolean)),
        ];
        ["as-section", "edit-section"].forEach((id) => {
          const el = document.getElementById(id);
          if (!el) return;
          el.innerHTML = '<option value="">No section</option>';
          sectionIds.forEach((sid) => {
            const opt = document.createElement("option");
            opt.value = sid;
            opt.textContent = `Section ${sid}`;
            el.appendChild(opt);
          });
        });
      }

      async function submitAddStudent() {
        const student_id = parseInt(
          document.getElementById("as-id").value.trim(),
        );
        const first_name = document.getElementById("as-fname").value.trim();
        const middle_name =
          document.getElementById("as-mname").value.trim() || null;
        const last_name = document.getElementById("as-lname").value.trim();
        const section =
          document.getElementById("as-section").value.trim() || null;

        if (!student_id || !first_name || !last_name) {
          showError(
            "as-error",
            "Student ID, First Name, and Last Name are required.",
          );
          return;
        }
        try {
          await apiFetch("/students", {
            method: "POST",
            body: JSON.stringify({
              student_id,
              first_name,
              middle_name,
              last_name,
              section_id: section,
            }),
          });
          closeModal("addStudentModal");
          showToast("Student enrolled successfully!", "success");
          await loadStudents();
          await loadDashboardStats();
        } catch (e) {
          showError("as-error", e.message);
        }
      }

      function openEditStudentModal(studentId) {
        const s = allStudents.find((x) => x.student_id == studentId);
        if (!s) return;
        document.getElementById("edit-student-id").value = s.student_id;
        document.getElementById("edit-fname").value = s.first_name;
        document.getElementById("edit-mname").value = s.middle_name || "";
        document.getElementById("edit-lname").value = s.last_name;
        populateSectionSelects();
        setTimeout(() => {
          document.getElementById("edit-section").value = s.section_id || "";
        }, 50);
        hideError("edit-error");
        openModal("editStudentModal");
      }

      async function submitEditStudent() {
        const id = document.getElementById("edit-student-id").value;
        const first_name = document.getElementById("edit-fname").value.trim();
        const last_name = document.getElementById("edit-lname").value.trim();
        const middle_name =
          document.getElementById("edit-mname").value.trim() || null;
        const section_id =
          document.getElementById("edit-section").value || null;

        if (!first_name || !last_name) {
          showError("edit-error", "First and Last Name are required.");
          return;
        }
        try {
          await apiFetch(`/students/${id}`, {
            method: "PUT",
            body: JSON.stringify({
              first_name,
              last_name,
              middle_name,
              section_id,
            }),
          });
          closeModal("editStudentModal");
          showToast("Student updated successfully!", "success");
          await loadStudents();
        } catch (e) {
          showError("edit-error", e.message);
        }
      }

      async function deleteStudent(studentId) {
        if (!confirm(`Delete student #${studentId}? This cannot be undone.`))
          return;
        try {
          await apiFetch(`/students/${studentId}`, { method: "DELETE" });
          showToast("Student deleted.", "info");
          await loadStudents();
          await loadDashboardStats();
        } catch (e) {
          showToast("Error: " + e.message, "danger");
        }
      }

      // ═══════════════════════════════════════════════════
      //  GRADES
      // ═══════════════════════════════════════════════════
      async function loadGradesForStudent(studentId) {
        if (!studentId) {
          document.getElementById("gradesTableBody").innerHTML =
            '<tr><td colspan="6" class="loading-row">Select a student to view grades</td></tr>';
          return;
        }
        document.getElementById("gradesTableBody").innerHTML =
          '<tr><td colspan="6" class="loading-row">Loading…</td></tr>';
        try {
          const grades = await apiFetch(`/grades/${studentId}`);
          allGrades = grades;
          renderGradesTable(grades);
        } catch (e) {
          document.getElementById("gradesTableBody").innerHTML =
            `<tr><td colspan="6" class="loading-row">No grades found for this student.</td></tr>`;
        }
      }

      function renderGradesTable(grades) {
        const tbody = document.getElementById("gradesTableBody");
        if (!grades.length) {
          tbody.innerHTML =
            '<tr><td colspan="6" class="loading-row">No grade records.</td></tr>';
          return;
        }
        tbody.innerHTML = grades
          .map((g) => {
            const s = allStudents.find((x) => x.student_id == g.student_id);
            const name = s
              ? `${s.last_name}, ${s.first_name}`
              : `Student #${g.student_id}`;
            const chipClass =
              g.numerical_grade >= 90
                ? "pass"
                : g.numerical_grade >= 75
                  ? "warn"
                  : "fail";
            return `<tr>
      <td class="fw-600">${name}</td>
      <td>Assignment #${g.assignment_id}</td>
      <td>Q${g.grading_period}</td>
      <td><input class="grade-input" type="number" value="${g.numerical_grade}" min="0" max="100" step=".01"
          onchange="inlineUpdateGrade(${g.grade_id}, ${g.assignment_id}, this.value)"/></td>
      <td><span class="grade-chip ${chipClass}">${g.status || autoStatus(g.numerical_grade)}</span></td>
      <td>
        <div style="display:flex;gap:4px;">
          <button class="btn btn-outline" style="padding:4px 10px;font-size:.72rem;" onclick="openEditGradeModal(${g.grade_id},${g.assignment_id},${g.numerical_grade})">Edit</button>
        </div>
      </td>
    </tr>`;
          })
          .join("");
      }

      function filterGrades() {
        const q = document.getElementById("gradesSearch").value.toLowerCase();
        const filtered = allGrades.filter((g) => {
          const s = allStudents.find((x) => x.student_id == g.student_id);
          const name = s ? `${s.first_name} ${s.last_name}`.toLowerCase() : "";
          return name.includes(q);
        });
        renderGradesTable(filtered);
      }

      function openAddGradeModal() {
        ["ag-grade", "ag-assignment"].forEach(
          (id) => (document.getElementById(id).value = ""),
        );
        document.getElementById("ag-period").value = "1";
        document.getElementById("ag-student").value = "";
        hideError("ag-error");
        openModal("addGradeModal");
      }

      async function submitAddGrade() {
        const student_id = parseInt(
          document.getElementById("ag-student").value,
        );
        const assignment_id = parseInt(
          document.getElementById("ag-assignment").value,
        );
        const grading_period = parseInt(
          document.getElementById("ag-period").value,
        );
        const grade = parseFloat(document.getElementById("ag-grade").value);
        const teacher_id = currentUser.teacher_id;

        if (!student_id || !assignment_id || isNaN(grade)) {
          showError("ag-error", "All fields are required.");
          return;
        }
        if (grade < 0 || grade > 100) {
          showError("ag-error", "Grade must be between 0 and 100.");
          return;
        }
        try {
          await apiFetch("/grades", {
            method: "POST",
            body: JSON.stringify({
              student_id,
              assignment_id,
              teacher_id,
              grading_period,
              grade,
            }),
          });
          closeModal("addGradeModal");
          showToast("Grade saved successfully!", "success");
          const sel = document.getElementById("gradesStudentFilter");
          if (sel.value) loadGradesForStudent(sel.value);
        } catch (e) {
          showError("ag-error", e.message);
        }
      }

      function openEditGradeModal(gradeId, assignmentId, currentGrade) {
        document.getElementById("eg-grade-id").value = gradeId;
        document.getElementById("eg-assignment").value = assignmentId;
        document.getElementById("eg-grade").value = currentGrade;
        hideError("eg-error");
        openModal("editGradeModal");
      }

      async function submitEditGrade() {
        const id = document.getElementById("eg-grade-id").value;
        const assignment_id = parseInt(
          document.getElementById("eg-assignment").value,
        );
        const grade = parseFloat(document.getElementById("eg-grade").value);
        const teacher_id = currentUser.teacher_id;

        if (!assignment_id || isNaN(grade)) {
          showError("eg-error", "All fields required.");
          return;
        }
        if (grade < 0 || grade > 100) {
          showError("eg-error", "Grade must be 0–100.");
          return;
        }
        try {
          await apiFetch(`/grades/${id}`, {
            method: "PUT",
            body: JSON.stringify({
              teacher_id,
              subject_id: assignment_id,
              grade,
            }),
          });
          closeModal("editGradeModal");
          showToast("Grade updated!", "success");
          const sel = document.getElementById("gradesStudentFilter");
          if (sel.value) loadGradesForStudent(sel.value);
        } catch (e) {
          showError("eg-error", e.message);
        }
      }

      async function inlineUpdateGrade(gradeId, assignmentId, newGrade) {
        const teacher_id = currentUser.teacher_id;
        try {
          await apiFetch(`/grades/${gradeId}`, {
            method: "PUT",
            body: JSON.stringify({
              teacher_id,
              subject_id: assignmentId,
              grade: parseFloat(newGrade),
            }),
          });
          showToast("Grade updated!", "success");
        } catch (e) {
          showToast("Error: " + e.message, "danger");
        }
      }

      function autoStatus(grade) {
        if (grade >= 75) return "Passed";
        return "Failed";
      }

      // ═══════════════════════════════════════════════════
      //  ATTENDANCE
      // ═══════════════════════════════════════════════════
      async function loadAttendanceForStudent(studentId) {
        const tbody = document.getElementById("attendanceTableBody");
        if (!studentId) {
          tbody.innerHTML =
            '<tr><td colspan="3" class="loading-row">Select a student to view attendance records</td></tr>';
          return;
        }
        tbody.innerHTML =
          '<tr><td colspan="3" class="loading-row">Loading…</td></tr>';
        try {
          const records = await apiFetch(`/attendance/${studentId}`);
          if (!records.length) {
            tbody.innerHTML =
              '<tr><td colspan="3" class="loading-row">No attendance records found.</td></tr>';
            return;
          }
          const colorMap = {
            Present: "good",
            Absent: "at-risk",
            Tardy: "warning",
            Excused: "",
          };
          tbody.innerHTML = records
            .map(
              (a) => `
      <tr>
        <td>${a.date ? new Date(a.date).toLocaleDateString("en-PH") : a.date}</td>
        <td>Assignment #${a.assignment_id}</td>
        <td><span class="status-pill ${colorMap[a.status] || ""}">${a.status}</span></td>
      </tr>
    `,
            )
            .join("");
        } catch (e) {
          tbody.innerHTML =
            '<tr><td colspan="3" class="loading-row">No attendance records found.</td></tr>';
        }
      }

      function openRecordAttendanceModal() {
        document.getElementById("ra-student").value = "";
        document.getElementById("ra-assignment").value = "";
        document.getElementById("ra-status").value = "Present";
        document.getElementById("ra-date").value = new Date()
          .toISOString()
          .split("T")[0];
        hideError("ra-error");
        document.getElementById("ra-warning").style.display = "none";
        openModal("recordAttModal");
      }

      async function submitAttendance() {
        const student_id = parseInt(
          document.getElementById("ra-student").value,
        );
        const assignment_id = parseInt(
          document.getElementById("ra-assignment").value,
        );
        const date = document.getElementById("ra-date").value;
        const status = document.getElementById("ra-status").value;
        const teacher_id = currentUser.teacher_id;
        const subject_id = assignment_id; // backend uses subject_id check in middleware

        if (!student_id || !assignment_id || !date || !status) {
          showError("ra-error", "All fields are required.");
          return;
        }
        try {
          const result = await apiFetch("/attendance", {
            method: "POST",
            body: JSON.stringify({
              student_id,
              assignment_id,
              teacher_id,
              subject_id,
              date,
              status,
            }),
          });
          const warnEl = document.getElementById("ra-warning");
          if (result.warning) {
            warnEl.textContent = "⚠ " + result.warning;
            warnEl.style.display = "block";
            setTimeout(() => {
              closeModal("recordAttModal");
            }, 2500);
          } else {
            closeModal("recordAttModal");
          }
          showToast(
            result.warning
              ? "⚠ Attendance saved — student at risk!"
              : "Attendance recorded!",
            result.warning ? "danger" : "success",
          );
          const sel = document.getElementById("attStudentFilter");
          if (sel.value == student_id) loadAttendanceForStudent(student_id);
          await loadAtRiskDashboard();
        } catch (e) {
          showError("ra-error", e.message);
        }
      }

      // ═══════════════════════════════════════════════════
      //  DASHBOARD DATA
      // ═══════════════════════════════════════════════════
      async function loadDashboardStats() {
        document.getElementById("statTotalStudents").textContent =
          allStudents.length || "—";
        document.getElementById("statTotalSub").textContent =
          `${allStudents.length} enrolled students`;
      }

      async function loadAtRiskDashboard() {
        // Try all sections we know about
        const sections = [
          ...new Set(allStudents.map((s) => s.section_id).filter(Boolean)),
        ];
        const container = document.getElementById("atRiskList");
        let allRisk = [];
        for (const sid of sections) {
          try {
            // The at-risk report uses section name — we need to get it by section ID → name
            // Since we don't have a sections endpoint, try section_id as name string
            const rows = await apiFetch(`/reports/at-risk/${sid}`).catch(
              () => [],
            );
            if (Array.isArray(rows)) allRisk = allRisk.concat(rows);
          } catch (e) {}
        }
        document.getElementById("statAtRisk").textContent =
          allRisk.length || "0";

        if (!allRisk.length) {
          container.innerHTML =
            '<div class="empty-state">🎉 No at-risk students found.</div>';
          return;
        }
        container.innerHTML = allRisk
          .slice(0, 5)
          .map((r) => {
            const initials = r.Student_Name.split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();
            const total = r.Total_Absences;
            const pill = total >= 5 ? "critical" : "warning";
            const label = total >= 5 ? "CRITICAL" : "WARNING";
            return `<div class="risk-student-item">
      <div class="risk-avatar">${initials}</div>
      <div class="risk-student-info">
        <div class="risk-student-name">${r.Student_Name}</div>
        <div class="risk-student-meta">${r.Section} · ${r.Subject} · ${total} absences</div>
      </div>
      <span class="risk-pill ${pill}">${label}</span>
    </div>`;
          })
          .join("");
      }

      async function loadExcellenceDashboard() {
        try {
          const rows = await apiFetch("/reports/academic-excellence");
          document.getElementById("statExcellence").textContent = rows.length;
          const ranks = ["🥇", "🥈", "🥉"];
          const classes = ["gold", "silver", "bronze"];
          document.getElementById("excellenceList").innerHTML = rows
            .slice(0, 6)
            .map((r, i) => {
              const initials = r.Student_Name.split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();
              return `<div class="leaderboard-item">
        <div class="lb-rank ${classes[i] || "other"}">${ranks[i] || i + 1}</div>
        <div class="risk-avatar">${initials}</div>
        <div style="flex:1">
          <div class="lb-name">${r.Student_Name}</div>
          <div class="lb-section">Adviser: ${r.Advisor}</div>
        </div>
        <div class="lb-gwa">${parseFloat(r.GWA).toFixed(1)}</div>
        <span class="lb-badge">With Honors</span>
      </div>`;
            })
            .join("");
        } catch (e) {
          document.getElementById("statExcellence").textContent = "0";
          document.getElementById("excellenceList").innerHTML =
            '<div class="empty-state">No excellence data yet.</div>';
        }
      }

      async function loadAssignmentsDashboard() {
        try {
          const rows = await apiFetch("/reports/teacher-assignments");
          document.getElementById("statAssignments").textContent = rows.length;
          document.getElementById("assignmentsList").innerHTML = rows
            .slice(0, 6)
            .map(
              (r) => `
      <div style="padding:8px 0;border-bottom:1px solid var(--gray-100);font-size:.78rem;">
        <div class="fw-600">${r.Subject}</div>
        <div class="text-muted">${r.Teacher_Name} · ${r.Section} (${r.Grade_Level})</div>
      </div>
    `,
            )
            .join("");
        } catch (e) {
          document.getElementById("statAssignments").textContent = "—";
          document.getElementById("assignmentsList").innerHTML =
            '<div class="empty-state">No assignment data.</div>';
        }
      }

      // ═══════════════════════════════════════════════════
      //  REPORTS
      // ═══════════════════════════════════════════════════
      async function fetchAtRiskReport() {
        const section = document
          .getElementById("rpt-atrisk-section")
          .value.trim();
        if (!section) {
          showToast("Please enter a section name.", "danger");
          return;
        }
        try {
          const rows = await apiFetch(
            `/reports/at-risk/${encodeURIComponent(section)}`,
          );
          showReportTable(
            "At-Risk Students — " + section,
            ["Student", "Section", "Subject", "Teacher", "Total Absences"],
            rows.map((r) => [
              r.Student_Name,
              r.Section,
              r.Subject,
              r.Subject_Teacher,
              r.Total_Absences,
            ]),
          );
        } catch (e) {
          showToast("No data: " + e.message, "danger");
        }
      }

      async function fetchExcellenceReport() {
        try {
          const rows = await apiFetch("/reports/academic-excellence");
          showReportTable(
            "Academic Excellence Candidates",
            ["Student", "Adviser", "GWA"],
            rows.map((r) => [
              r.Student_Name,
              r.Advisor,
              parseFloat(r.GWA).toFixed(2),
            ]),
          );
        } catch (e) {
          showToast("No data: " + e.message, "danger");
        }
      }

      async function fetchTeacherAssignments() {
        try {
          const rows = await apiFetch("/reports/teacher-assignments");
          showReportTable(
            "Teacher Assignment Report",
            ["Teacher", "Subject", "Section", "Grade Level"],
            rows.map((r) => [
              r.Teacher_Name,
              r.Subject,
              r.Section,
              r.Grade_Level,
            ]),
          );
        } catch (e) {
          showToast("No data: " + e.message, "danger");
        }
      }

      async function fetchSectionSummary() {
        const sid = document.getElementById("rpt-section-id").value.trim();
        if (!sid) {
          showToast("Please enter a Section ID.", "danger");
          return;
        }
        try {
          const rows = await apiFetch(`/reports/section-summary/${sid}`);
          showReportTable(
            "Section Summary",
            [
              "Section ID",
              "Section",
              "Grade Level",
              "Adviser",
              "Total Students",
            ],
            rows.map((r) => [
              r.Section_ID,
              r.Section,
              r.Grade_Level,
              r.Adviser_Name || "—",
              r.Total_Students,
            ]),
          );
        } catch (e) {
          showToast("No data: " + e.message, "danger");
        }
      }

      function showReportTable(title, headers, rows) {
        document.getElementById("reportResultTitle").textContent = title;
        document.getElementById("reportTableHead").innerHTML =
          "<tr>" + headers.map((h) => `<th>${h}</th>`).join("") + "</tr>";
        document.getElementById("reportTableBody").innerHTML = rows.length
          ? rows
              .map(
                (r) =>
                  "<tr>" + r.map((c) => `<td>${c}</td>`).join("") + "</tr>",
              )
              .join("")
          : `<tr><td colspan="${headers.length}" class="loading-row">No data found.</td></tr>`;
        document.getElementById("reportResultCard").style.display = "block";
        document
          .getElementById("reportResultCard")
          .scrollIntoView({ behavior: "smooth" });
      }

      // ═══════════════════════════════════════════════════
      //  TEACHER PROFILE
      // ═══════════════════════════════════════════════════
      async function openTeacherProfile() {
        const u = currentUser;
        document.getElementById("tp-avatar").textContent =
          u.initials ||
          u.name
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
        document.getElementById("tp-name").textContent = u.name;
        document.getElementById("tp-role").textContent = u.role;
        document.getElementById("tp-email-chip").textContent = "📧 " + u.email;
        document.getElementById("tp-fullname").textContent = u.name;
        document.getElementById("tp-role-detail").textContent = u.role;
        document.getElementById("tp-email").textContent = u.email;
        document.getElementById("tp-phone").textContent = u.phone || "—";
        document.getElementById("tp-tid").textContent = u.teacher_id;

        document.getElementById("teacherProfileModal").classList.add("open");

        // Load my assignments
        try {
          const rows = await apiFetch("/reports/teacher-assignments");
          const mine = rows; // filter by teacher name if needed
          document.getElementById("tp-assignments-body").innerHTML = mine.length
            ? mine
                .map(
                  (r) => `<tr>
          <td class="fw-600">${r.Subject}</td>
          <td>${r.Section}</td>
          <td>${r.Grade_Level}</td>
        </tr>`,
                )
                .join("")
            : '<tr><td colspan="3" style="text-align:center;padding:20px;color:var(--gray-400)">No assignments found.</td></tr>';
        } catch (e) {
          document.getElementById("tp-assignments-body").innerHTML =
            '<tr><td colspan="3" style="text-align:center;padding:20px;color:var(--gray-400)">Could not load assignments.</td></tr>';
        }
      }

      function closeTeacherProfile() {
        document.getElementById("teacherProfileModal").classList.remove("open");
      }

      function switchProfileTab(el, paneId) {
        document
          .querySelectorAll(".tp-tab")
          .forEach((t) => t.classList.remove("active"));
        document
          .querySelectorAll(".tp-pane")
          .forEach((p) => p.classList.remove("active"));
        el.classList.add("active");
        document.getElementById(paneId).classList.add("active");
      }

      // ═══════════════════════════════════════════════════
      //  MODAL HELPERS
      // ═══════════════════════════════════════════════════
      function openModal(id) {
        document.getElementById(id).classList.add("open");
      }
      function closeModal(id) {
        document.getElementById(id).classList.remove("open");
      }
      function closeOnBackdrop(e, id) {
        if (e.target === document.getElementById(id)) closeModal(id);
      }
      function showError(elId, msg) {
        const el = document.getElementById(elId);
        el.textContent = msg;
        el.classList.add("show");
      }
      function hideError(elId) {
        const el = document.getElementById(elId);
        if (el) {
          el.textContent = "";
          el.classList.remove("show");
        }
      }

      // ═══════════════════════════════════════════════════
      //  PROFILE DROPDOWN
      // ═══════════════════════════════════════════════════
      function toggleProfileDropdown(e) {
        if (e) e.stopPropagation();
        document.getElementById("profileDropdown").classList.toggle("open");
      }
      document.addEventListener("click", () => {
        document.getElementById("profileDropdown").classList.remove("open");
      });

      // ═══════════════════════════════════════════════════
      //  LOGOUT
      // ═══════════════════════════════════════════════════
      function doLogout() {
        sessionStorage.removeItem("edutrack_user");
        window.location.href = "login.html";
      }

      // ═══════════════════════════════════════════════════
      //  TOAST
      // ═══════════════════════════════════════════════════
      function showToast(msg, type = "info") {
        const icons = { success: "✅", danger: "❌", info: "ℹ️" };
        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        toast.innerHTML = `<span class="ti">${icons[type] || "ℹ️"}</span><span>${msg}</span>`;
        document.getElementById("toastContainer").appendChild(toast);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            toast.classList.add("show");
          });
        });
        setTimeout(() => {
          toast.classList.remove("show");
          setTimeout(() => toast.remove(), 400);
        }, 3500);
      }

      // ═══════════════════════════════════════════════════
      //  KEYBOARD
      // ═══════════════════════════════════════════════════
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          document
            .querySelectorAll(".modal-overlay.open")
            .forEach((m) => m.classList.remove("open"));
          closeTeacherProfile();
          document.getElementById("profileDropdown").classList.remove("open");
        }
      });