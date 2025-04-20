// src/routes/attendanceRoutes.ts
import express, { Request, Response, RequestHandler } from 'express';
import * as attendanceController from '../controllers/attendanceController';
import * as attendanceModel from '../models/attendanceModel';
import { parse } from 'json2csv';

const router = express.Router();

// Route for employee check-in
router.post('/checkin', attendanceController.checkIn as RequestHandler);

// Route for employee check-out
router.post('/checkout', attendanceController.checkOut as RequestHandler);

// Route to get all attendance records (optional, could be useful for admins)
router.get('/attendance', attendanceController.getAllAttendance as RequestHandler);

// Route to get attendance for a specific employee by ID
router.get('/attendance/:employee_id', attendanceController.getAttendanceById as RequestHandler);

// Route to get reports (optional, could be useful for admins)
router.get('/reports', attendanceController.getReport as RequestHandler);

// Route to download the attendance report in CSV format
router.get('/reports/download/csv', (async (req: Request, res: Response) => {
    const filters = {
      employee_name: req.query.employee_name as string,
      department: req.query.department as string,
      start_date: req.query.start_date as string,
      end_date: req.query.end_date as string,
    };
  
    try {
      // Fetch the report with filters
      const report = await attendanceModel.getReport(filters);
  
      if (Array.isArray(report) && report.length === 0) {
        return res.status(404).json({ message: 'No records found for the given filters' });
      }
  
      // Convert the report data to CSV
      const csv = parse(report as any[]);
  
      // Set the response headers for CSV file download
      res.header('Content-Type', 'text/csv');
      res.attachment('attendance_report.csv'); // You can dynamically name the file here
      res.send(csv);  // Send the CSV as the response
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching report' });
    }
  }) as RequestHandler);
  
  export default router;
