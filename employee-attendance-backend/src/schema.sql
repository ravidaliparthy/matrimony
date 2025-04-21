CREATE DATABASE IF NOT EXISTS employee_attendance;
USE employee_attendance;

-- Create the attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id INT PRIMARY KEY AUTO_INCREMENT,
  employee_name VARCHAR(255) NOT NULL,
  employee_id VARCHAR(50) NOT NULL,
  department VARCHAR(100) NOT NULL,
  check_in_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  check_out_time TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
