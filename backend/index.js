const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/students', require('./routes/students'));
app.use('/api/grades', require('./routes/grades'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/reports', require('./routes/reports'));

app.listen(process.env.PORT, () => {
  console.log(`EduTrack running on port ${process.env.PORT}`);
});