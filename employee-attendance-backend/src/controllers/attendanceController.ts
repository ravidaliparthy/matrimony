// src/controllers/attendanceController.ts

import { parse } from 'json2csv';
import { Request, Response } from 'express';
import * as attendanceModel from '../models/attendanceModel';

// Handle Check-in
export const checkIn = async (req: Request, res: Response) => {
  const { employee_name, employee_id, department } = req.body;

  if (!employee_name || !employee_id || !department) {
    return res.status(400).json({ message: 'Employee name, ID, and department are required' });
  }

  try {
    const result = await attendanceModel.checkIn({ employee_name, employee_id, department });
    res.status(201).json({ message: 'Check-in successful', result });
  }catch (error) {
    console.error(error); // This logs the real error
    res.status(500).json({ message: 'Error during check-in' });
  }
  
};

// Handle Check-out
export const checkOut = async (req: Request, res: Response) => {
  const { employee_id } = req.body;

  if (!employee_id) {
    return res.status(400).json({ message: 'Employee ID is required' });
  }

  try {
    const result = await attendanceModel.checkOut(employee_id);

    if (!result || (Array.isArray(result) && result.length === 0)) {
      return res.status(400).json({ message: 'No check-in record found for today, or already checked out' });
    }

    res.status(200).json({ message: 'Check-out successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error during check-out' });
  }
};

// Get all attendance records
export const getAllAttendance = async (req: Request, res: Response) => {
  try {
    const records = await attendanceModel.getAllAttendance();
    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching attendance records' });
  }
};

// Get attendance by employee ID
export const getAttendanceById = async (req: Request, res: Response) => {
  const { employee_id } = req.params;

  if (!employee_id) {
    return res.status(400).json({ message: 'Employee ID is required' });
  }

  try {
    const records = await attendanceModel.getAttendanceById(employee_id);
    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching attendance records for this employee' });
  }
};

// Get attendance reports based on filters
export const getReport = async (req: Request, res: Response) => {
  const { employee_name, department, start_date, end_date } = req.query;

  const filters = {
    employee_name: employee_name ? String(employee_name) : undefined,
    department: department ? String(department) : undefined,
    start_date: start_date ? String(start_date) : undefined,
    end_date: end_date ? String(end_date) : undefined
  };

  try {
    const report = await attendanceModel.getReport(filters);
    res.status(200).json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching report' });
  }
};

// Controller method to generate CSV report
export const downloadReportCSV = async (req: Request, res: Response) => {
  const { employee_name, department, start_date, end_date } = req.query;
  
  const filters = {
    employee_name: employee_name ? String(employee_name) : undefined,
    department: department ? String(department) : undefined,
    start_date: start_date ? String(start_date) : undefined,
    end_date: end_date ? String(end_date) : undefined,
  };

  try {
    const report = await attendanceModel.getReport(filters);

    // Fix type error here
    const csv = parse(report as any[]);

    res.header('Content-Type', 'text/csv');
    res.attachment('attendance_report.csv');
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching report' });
  }
};

