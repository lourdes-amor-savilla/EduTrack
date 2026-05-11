const DEMO = {
  "ana.reyes@rcos.edu.ph": {
    teacher_id: 1,
    name: "Mrs. Ana Reyes",
    initials: "AR",
    role: "Subject Teacher",
    section_id: null,
  },
  "carlos.bautista@rcos.edu.ph": {
    teacher_id: 2,
    name: "Mr. Carlos Bautista",
    initials: "CB",
    role: "Class Adviser",
    section_id: 1,
  },
  "jose.cruz@rcos.edu.ph": {
    teacher_id: 3,
    name: "Mr. Jose Cruz",
    initials: "JC",
    role: "Subject Teacher",
    section_id: null,
  },
};
function fillDemo(email) {
  document.getElementById("email").value = email;
  document.getElementById("password").value = "password123";
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") doLogin();
});
function doLogin() {
  const btn = document.getElementById("loginBtn");
  const email = document.getElementById("email").value.trim();
  const pass = document.getElementById("password").value.trim();
  if (!email || !pass) {
    showError("Please enter your email and password.");
    return;
  }
  btn.disabled = true;
  btn.textContent = "Signing in…";
  document.getElementById("errorMsg").classList.remove("show");
  setTimeout(() => {
    if (pass === "password123" && DEMO[email]) {
      sessionStorage.setItem(
        "edutrack_user",
        JSON.stringify({ ...DEMO[email], email }),
      );
      window.location.href = "dashboard.html";
    } else {
      showError("Invalid credentials. Try the demo buttons above.");
      btn.disabled = false;
      btn.textContent = "Sign In";
    }
  }, 700);
}
function showError(msg) {
  const el = document.getElementById("errorMsg");
  el.textContent = msg;
  el.classList.add("show");
}