// src/models/attendanceModel.ts

import { db } from '../index';

interface Attendance {
  employee_name: string;
  employee_id: string;
  department: string;
}

export const checkIn = async (data: Attendance) => {
  const { employee_name, employee_id, department } = data;

  const [rows] = await db.query(
    `INSERT INTO attendance (employee_name, employee_id, department) VALUES (?, ?, ?)`,
    [employee_name, employee_id, department]
  );
  return rows;
};

export const checkOut = async (employee_id: string) => {
  const [rows] = await db.query(
    `UPDATE attendance 
     SET check_out_time = CURRENT_TIMESTAMP 
     WHERE employee_id = ? 
     AND DATE(check_in_time) = CURDATE() 
     AND check_out_time IS NULL`,
    [employee_id]
  );
  return rows;
};

export const getAllAttendance = async () => {
  const [rows] = await db.query(`SELECT * FROM attendance ORDER BY check_in_time DESC`);
  return rows;
};

export const getAttendanceById = async (employee_id: string) => {
  const [rows] = await db.query(
    `SELECT * FROM attendance WHERE employee_id = ? ORDER BY check_in_time DESC`,
    [employee_id]
  );
  return rows;
};

// Assuming you are using MySQL with some ORM or query builder
// Backend code for filtering attendance records
export const getReport = async (filters: {
  employee_name?: string;
  department?: string;
  start_date?: string;
  end_date?: string;
}) => {
  let query = `SELECT * FROM attendance WHERE 1=1`; // This is the base query
  const values: any[] = [];

  // Apply the employee_name filter if provided
  if (filters.employee_name) {
    query += ` AND employee_name LIKE ?`; // Use LIKE for partial matching
    values.push(`%${filters.employee_name}%`); // Example: %John% to match any name containing "John"
  }

  // Apply the department filter if provided
  if (filters.department) {
    query += ` AND department = ?`; // Exact match for department
    values.push(filters.department); 
  }

  // Apply date filters if both start_date and end_date are provided
  if (filters.start_date && filters.end_date) {
    query += ` AND DATE(check_in_time) BETWEEN ? AND ?`; // Filter by date range
    values.push(filters.start_date, filters.end_date);
  }

  query += ` ORDER BY check_in_time DESC`; // Order results by check-in time (optional)

  try {
    const [rows] = await db.query(query, values); // Execute query with parameters
    return rows; // Return filtered rows
  } catch (error) {
    console.error("Error fetching attendance report:", error);
    throw error; // Handle errors (e.g., database errors)
  }
};


// src/models/attendanceModel.ts