<<<<<<< HEAD
# Matrimony

# 🕒 Employee Attendance System

A full-stack **Employee Attendance System** built with **Angular 16**, **Node.js (TypeScript)**, **Express**, and **MySQL**. This application allows employees to check-in/check-out and lets managers view and export attendance reports — all without login/signup.

---

## 🎯 Objective

Build a web-based attendance management system where:

- Employees can easily **check in**, **check out**, and **view their own attendance history**.
- Managers can **filter**, **view**, and **download** reports of employee attendance.

---

## ✅ Features & Functional Requirements

### 👥 User Roles

No authentication is required.

- **Employees**
  - Check in with required details
  - Check out
  - View personal attendance history

- **Managers**
  - View attendance reports with filters
  - Export reports as CSV

---

### 🧾 Attendance Management (Employees)

**Check-In**

- Employee Name (Required)
- Employee ID (Required)
- Department (Dropdown - Required)
- Auto-generated Check-in Time

**Check-Out**

- Employee selects Employee ID
- Auto-generated Check-out Time

**View Attendance History**

- Table showing check-in/check-out records
- Check-in button (disabled after check-in)
- Check-out button (enabled after check-in)

---

### 📊 Attendance Reports (Managers)

- Filter reports by:
  - Employee Name
  - Department
  - Date Range
- Export filtered reports as **CSV**

---

## 🖥️ Frontend (Angular 16)

### 🔧 Tools & Libraries

- **Angular 16**
- **Angular Material**
- **RxJS**
- **TypeScript**

### 📁 Folder Structure & Components

| Component                  | Path                        | Description                        |
|---------------------------|-----------------------------|------------------------------------|
| `AttendanceComponent`     | `/attendance`               | Employee check-in/check-out        |
| `AttendanceHistoryComponent` | `/attendance/history`     | Shows employee's own attendance    |
| `ReportComponent`         | `/reports`                  | Manager view for attendance reports|

---

## 🌐 Backend (Node.js + TypeScript + Express)

### 🔧 Tools & Libraries

- **Node.js**
- **TypeScript**
- **Express**
- **MySQL**
- **CSV Parser**

### 🔌 API Endpoints

| Method | Endpoint                        | Description                      |
|--------|----------------------------------|----------------------------------|
| POST   | `/api/attendance/checkin`        | Employee checks in               |
| POST   | `/api/attendance/checkout`       | Employee checks out              |
| GET    | `/api/attendance`                | Get all attendance records       |
| GET    | `/api/attendance/:id`            | Get attendance for one employee  |
| GET    | `/api/reports`                   | Get filtered attendance reports  |

---

## 🗃️ Database Schema (MySQL)

### `attendance` Table

| Column Name     | Type          | Constraints                     |
|-----------------|---------------|----------------------------------|
| `id`            | INT           | PRIMARY KEY, AUTO_INCREMENT     |
| `employee_name` | VARCHAR(255)  | NOT NULL                        |
| `employee_id`   | VARCHAR(50)   | NOT NULL                        |
| `department`    | VARCHAR(100)  | NOT NULL                        |
| `check_in_time` | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP       |
| `check_out_time`| TIMESTAMP     | NULL                            |
| `created_at`    | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP       |

---

## ⚙️ Validation & Error Handling

- Prevent check-out without check-in
- Avoid duplicate check-ins on the same day
- Validate required fields (Name, ID, Department)
- Show appropriate UI feedback (success/error)
- Use correct HTTP status codes for API responses

---

## 📦 Installation & Setup

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
=======
# matrimony
>>>>>>> f7ccbd9cf507c301483c572031005bbd82737e6e
