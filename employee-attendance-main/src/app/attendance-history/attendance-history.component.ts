import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AttendanceService } from '../attendance.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-attendance-history',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule],
  templateUrl: './attendance-history.component.html',
  styleUrl: './attendance-history.component.css'
})
export class AttendanceHistoryComponent implements OnInit {
  displayedColumns: string[] = ['employee_id', 'check_in_time', 'check_out_time'];
  dataSource: any[] = [];
  hasRecords = false;
  employeeIdInput: string = ''; // Input for employee ID

  constructor(private attendanceService: AttendanceService) { }

  ngOnInit(): void {
    // No initial data load, waiting for user to enter employee ID
  }

  viewHistory() {
    if (this.employeeIdInput) {
      this.loadAttendanceHistory(this.employeeIdInput);
    } else {
      // Optionally, display an error message if input is empty
      console.log('Please enter an Employee ID');
    }
  }

  loadAttendanceHistory(employeeId: string) {
    this.hasRecords = false; // Reset hasRecords before fetching
    this.attendanceService.getAttendanceHistory(employeeId).subscribe({
      next: (history) => {
        this.dataSource = history;
        this.hasRecords = history.length > 0;
      },
      error: (error) => {
        console.error('Error fetching attendance history:', error);
        this.hasRecords = false; // Ensure hasRecords is false in case of error
        this.dataSource = []; // Clear previous data
      }
    });
  }
}

// Backend API endpoint: /api/attendance/history/{employeeId}
