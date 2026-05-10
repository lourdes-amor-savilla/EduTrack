# EDUTRACK: A Collaborative Teacher’s Portal for Academic Oversight
EduTrack: A Collaborative Teacher’s Portal for Academic Insight is a database application specifically designed for teachers in Reyes Computer Oriented School. It aims to bridge the communication gap between the subject teachers and the class adviser by providing a unified workplace where they can collaborate in monitoring the student progress. 

The streamline of this system in managing the student’s record is through integrating two important pillars of school success: Academic performance and Attendance consistency. In contrast to traditional record keeping, EduTrack merges daily attendance along with multi-subject grade evaluation to deliver real-time data analysis, allowing class advisers to view the overall academic status of their students, identifying performance patterns and attendance issues before they lead to failure or dropouts. 

---

# How To Run?
## Prerequisites *(same as before)*

XAMPP (for MySQL)
Node.js (LTS)
Git

---

## Database Setup
Open XAMPP, start MySQL. Go to `http://localhost/phpmyadmin`, create a database named edutrack.
Then import in this order — order matters now because views depend on the tables:

1. `database/schema.sql`
2. `database/data.sql` ← new, sample data
3. `database/views.sql` ← new, needed for reports

---

## Environment Variables
Go into the `backend/` folder. The `.env.example` is already filled out correctly — just rename it to `.env`. Or create a new `.env` manually:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=edutrack
PORT=3000
```
If your XAMPP MySQL has a password set, fill in DB_PASSWORD. *Most local setups don't.*

Note: *Port changed from 5000 (old) to 3000 (new).*

---

## Install Dependencies
```bash
cd backend
npm install
```

---

## Run It
```bash
npm run dev
```
That uses nodemon now, so the server auto-restarts when you edit files. If you don't want that, npm start works too.
Server will be at `http://localhost:3000`. Test it with `http://localhost:3000/api/students`.

---

## Frontend
Just open `EduTrack_Front.html` directly in your browser. Same with `Log_inPage.html`. No build step needed — it's plain HTML.