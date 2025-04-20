// src/index.ts

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import attendanceRoutes from './routes/attendanceRoutes';  // ✅ You have this

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test DB connection
db.getConnection()
  .then(() => {
    console.log('✅ Connected to MySQL database');
  })
  .catch((err) => {
    console.error('❌ Failed to connect to database:', err);
    process.exit(1);
  });

app.get('/', (req, res) => {
  res.send('Employee Attendance API is running!');
});

// ✅ Mount the attendance routes
app.use('/api/attendance', attendanceRoutes);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);

});

app.use(cors({ origin: 'http://localhost:4200' }));


export { db };
