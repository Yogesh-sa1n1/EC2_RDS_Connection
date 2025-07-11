const express = require('express');
const mysql = require('mysql');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('❌ DB connection failed:', err.stack);
    return;
  }
  console.log('✅ Connected to RDS MySQL');
});

// Serve HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'form.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { name, email, department } = req.body;
  const query = 'INSERT INTO employees (name, email, department) VALUES (?, ?, ?)';
  db.query(query, [name, email, department], (err, result) => {
    if (err) {
      console.error('❌ Insert error:', err);
      return res.send('Error saving to database.');
    }
    res.send('✅ Data saved successfully!');
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
